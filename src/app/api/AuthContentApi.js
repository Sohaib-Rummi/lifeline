import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore as db, GoogleSignin, storage, messaging } from '../database/DB';
import { trim, validateName, validatePassword, validatePhoneNumber } from '../utils/Functions';
import { users } from '../database/Collections';
const AuthContext = createContext(null);

const AuthContentApi = ({ children }) => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [user, setUser] = useState({});
    const [currentUserId, setCurrentUserId] = useState('');
    const [profileAlert, setProfileAlert] = useState(false);


    const checkIsAppFirstLaunched = async () => {
        const value = await AsyncStorage.getItem('isAppFirstLaunched');
        if (value === null) {
            setIsAppFirstLaunched(true);
            AsyncStorage.setItem('isAppFirstLaunched', 'false');
        }
        else {
            setIsAppFirstLaunched(false);
        }
    }

    const getUserById = async (id) => {
        try {
            const documentSnapshot = await users.doc(id).get();
            if (documentSnapshot.exists) {
                return documentSnapshot.data();
            }
        } catch (error) {
            console.log("Get user error", error);
        }
    }

    const isProfileCompleted = async () => {
        const get_user = await getUserById(auth().currentUser.uid);
        console.log(get_user);
        if (get_user && get_user.id == auth().currentUser.uid) {
            if (get_user.address == "" || get_user.bloodgroup == "" || get_user.phone == "") {
                setProfileAlert(true);
            }
            else {
                setProfileAlert(false);
            }
        }

    }



    const getAllDeviceTokens = async () => {
        try {
            let tokens = [];
            const querySnapshot = await users.get();
            if (querySnapshot.size > 0) {
                querySnapshot.forEach((documentSnapshot) => {
                    tokens.push(documentSnapshot.data().token);
                });
                return tokens;
            }
        } catch (error) {
            console.log("Getting all device tokens error", error)
        }

    }


    const getCurrentUser = () => {
        users
            .doc(auth().currentUser.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setUser(documentSnapshot.data());
                    setCurrentUserId(auth().currentUser.uid);
                }
            })
            .catch(err => {
                console.log("Get user error", err);
            });

    }

    const setCurrentUser = (new_user, name, token) => {
        users.doc(new_user.uid)
            .set({
                id: new_user.uid,
                name: new_user.displayName ? new_user.displayName : name,
                email: new_user.email,
                phone: '',
                address: '',
                dob: '',
                bloodgroup: '',
                lastbleed: '',
                gender: '',
                image: new_user.photoURL ? new_user.photoURL : '',
                city: '',
                location: { latitude: '', longitude: '' },
                status: 0,
                token: token && token,
            })
            .then(() => {
                getCurrentUser();
                isProfileCompleted();
            })
            .catch(error => {
                console.log("Set user error", error);
            });
    }

    const sendVerificationMail = async (new_user) => {
        new_user.sendEmailVerification()
            .then(() => {
                console.log('Email sent successfully');
            })
            .catch((error) => {
                console.log('Email verification error:', error)
            });
    }

    const register = async (name, email, password) => {
        if (name === null || email === null || password === null) {
            setError('All the fields are required.');
        }
        else if (!validateName(name)) {
            setError("Name should contain only letters and white space.");
        }
        else if (!validatePassword(password)) {
            setError("Password Should be minimum 8 characters long.");
        }
        else {
            setIsLoading(true);
            try {
                const response = await auth().createUserWithEmailAndPassword(trim(email), trim(password));
                const token = await messaging().getToken();
                if (response) {
                    await sendVerificationMail(response.user);
                    setCurrentUser(response.user, trim(name), token);
                    setError(null);
                    setIsLoading(false);
                    setMessage('Account created. Verify your email for login your account');
                }
            } catch (error) {
                setIsLoading(false);
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid Email Address');
                }
                else if (error.code === 'auth/email-already-in-use') {
                    setError('Email already exists');
                }
                else {
                    setError('Sorry, something went wrong');
                }
            }
        }
    }

    const login = async (email, password) => {

        if (email === null || password === null) {
            setError('Both fields are required');
        }
        else {
            try {
                setIsLoading(true);
                const response = await auth().signInWithEmailAndPassword(trim(email), trim(password));
                if (response) {
                    setError(null);
                    setIsLoading(false);
                    getCurrentUser();
                    isProfileCompleted();
                    const token = await messaging().getToken();
                    users.doc(auth().currentUser.uid).update({
                        token: token,
                    })
                        .then(() => {
                            console.log("Token Updated")
                        })
                        .catch((error) => {
                            console.log("Token Update Error ", error)
                        })
                }
            } catch (error) {
                setIsLoading(false);
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid Email Address');
                }
                else {
                    setError('Wrong email or password');
                }

            }
        }

    }

    const isUserExist = async (uid) => {
        const documentSnapshot = await users.doc(uid).get();
        return documentSnapshot.exists;
    };

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const response = await auth().signInWithCredential(googleCredential);
            if (response) {
                const isExist = await isUserExist(response.user.uid);
                const token = await messaging().getToken();
                if (!isExist) {
                    setCurrentUser(response.user, null, token);
                    getCurrentUser();
                    isProfileCompleted();

                }
                else {
                    getCurrentUser();

                    isProfileCompleted();
                    users.doc(auth().currentUser.uid).update({
                        token: token,
                    })
                        .then(() => {
                            console.log("Token Updated")
                        })
                        .catch((error) => {
                            console.log("Token Update Error ", error)
                        })
                }


            }
        } catch (error) {
            console.log("Google Login Error", error)
        }

    }

    const forgotPassword = async (email) => {
        if (email === null) {
            setError('Email is required');
        }
        else {
            setIsLoading(true);
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    setMessage("Email sent successfully");
                    setError(null);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    if (error.code === 'auth/invalid-email') {
                        setError('Invalid Email Address');
                    }
                    else {
                        setError('Sorry, something went wrong');
                    }
                })
        }


    }


    const updateProfile = (message, field, value) => {
        if (field === null && value === null) {
            setError('The field is required')
        }
        else if (field === "phone" && !validatePhoneNumber(value)) {
            setError('Invalid Phone Number');
        }
        else {
            setIsLoading(true);
            const updateObject = {};
            updateObject[field] = value;
            users.doc(currentUserId)
                .update(updateObject)
                .then(() => {
                    setIsLoading(false);
                    setError(null);
                    message && setMessage(`${message} updated successfully`);
                    getCurrentUser();
                })
                .catch(() => {
                    setIsLoading(false);
                    setError('Sorry, something is went wrong');
                });
        }



    }

    const checkImageExists = async (imageName) => {
        try {
            const reference = storage().ref('images/profiles/' + imageName);
            const metadata = await reference.getMetadata();
            return true;
        } catch (error) {
            if (error.code === 'storage/object-not-found') {
                return false;
            } else {
                console.log('Error checking image existence:', error);
            }
        }
    };

    const uploadProfile = async (imagePath) => {
        try {
            const isExist = await checkImageExists(currentUserId);
            if (isExist) {
                const reference = storage().ref('images/profiles/' + currentUserId);
                await reference.delete();
            }
            const reference = storage().ref('images/profiles/' + currentUserId);
            await reference.putFile(imagePath)

            const url = await storage().ref('images/profiles/' + currentUserId).getDownloadURL();
            if (url) {
                await users.doc(currentUserId).update({
                    image: url,
                });
                getCurrentUser();
                return true;
            }
        } catch (error) {
            console.log("Image Download Error", error);
        }

        return false;

    }


    const logout = async () => {
        try {
            const response = await auth().signOut();
            if (response) {
                setError(null);
                setProfileAlert(false);
            }
        } catch (error) {
            if (error) {
                setError("Sorry, something went wrong");
            }
        }
    }



    const value = {
        isAppFirstLaunched,
        checkIsAppFirstLaunched,
        isLoggedIn,
        setIsLoggedIn,
        error,
        setError,
        isLoading,
        login,
        logout,
        googleLogin,
        user,
        getCurrentUser,
        register,
        forgotPassword,
        message,
        setMessage,
        updateProfile,
        uploadProfile,
        setIsLoading,
        getUserById,
        currentUserId,
        getAllDeviceTokens,
        profileAlert,
        setProfileAlert
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContentApi, AuthContext }
