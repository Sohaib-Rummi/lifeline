import React, { useState, createContext, useContext } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { auth, storage } from '../database/DB';
import { API_KEY } from '../constants/Const';
import { AuthContext } from './AuthContentApi';
import { users } from '../database/Collections';
import {
  bloodrequests,
  bloodtypes,
  urgentbloodrequests,
  messages_collection,
  chats
} from '../database/Collections';
import { sendNotification } from './PermissionsApi';
import Toast from 'react-native-toast-message';
const AppContext = createContext(null);

const AppContentApi = ({ children }) => {

  const {
    updateProfile,
    user,
    getUserById,
    setIsLoading,
    isLoading,
    getAllDeviceTokens
  } = useContext(AuthContext);
  const [userCurrentLocation, setUserCurrentLocation] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState(null);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [availableDonors, setAvailableDonors] = useState([]);
  const [availableDonorsByBlood, setAvailableDonorsByBlood] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestLocation, setRequestLocation] = useState(null);
  const [requesters, setRequesters] = useState([]);
  const [urgentRequesters, setUrgentRequesters] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [shareLocation, setShareLocation] = useState(null);

  Geocoder.init(API_KEY, { language: "en" });

  const getUserCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        setUserCurrentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        getFormattedAddress(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log('Error getting user location:', error);
        Toast.show({
          type: 'error',
          text1: 'Enable your location services or Check your internet connection',

        });

      },
      { enableHighAccuracy: false, timeout: 50000, maximumAge: 20000 },
    );
  }

  const getFormattedAddress = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const result = response.results[0];
      for (let i = 0; i < result.address_components.length; i++) {
        const component = result.address_components[i];
        if (component.types.includes('locality')) {
          setCity(component.long_name);
        }
        if (component.types.includes('country')) {
          setCountry(component.long_name);
        }
      }
      setFormattedAddress(result.formatted_address);
    } catch (error) {
      console.log("Geocode", error);
    }
  };



  const getGeometryAddress = async (address) => {
    try {

      const data = await Geocoder.from(address);
      if (data.results[0].geometry.location) {
        const new_location = {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        }
        await updateProfile("Address", 'address', address);
        await updateProfile(null, "city", city);
        await updateProfile(null, "country", country);
        await updateProfile("Address", 'location', new_location);

      }
    } catch (error) {
      console.log("Geocode Reverse", error);
    }

  }

  const getRequestGeometryAddress = async (address) => {
    try {

      const data = await Geocoder.from(address);
      if (data.results[0].geometry.location) {
        const new_location = {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        }
        return new_location;

      }
    } catch (error) {
      console.log("Geocode Reverse", error);
    }
  }

  const toggleStatus = async (status) => {
    await updateProfile('Status', 'status', status);
  }

  const isDocExist = async (collection, doc_id) => {
    const documentSnapshot = await collection.doc(doc_id).get();
    return documentSnapshot.exists;
  };

  const getBloodUniversal = async () => {
    try {
      const documentSnapshot = await bloodtypes.doc(user.bloodgroup).get();
      if (documentSnapshot.exists) {
        return documentSnapshot.data();
      }
      else {
        return null;
      }
    } catch (error) {
      console.log("Getting Blood Universal Error");
    }

  }


  const getAvailableDonor = async () => {
    const data = await getBloodUniversal();
    if (data != null) {
      try {
        const donors = await users
          .where('status', '==', 1)
          .where('bloodgroup', 'in', data.receive_from)
          .get();
        if (donors.size > 0) {
          const donorsarray = [];
          donors.forEach(doc => {
            // console.log(doc.data())
            donorsarray.push(doc.data());
          });
          setAvailableDonors(donorsarray);
        }
        else {
          setAvailableDonors([]);
        }

      } catch (error) {
        console.log("Get Donors Error", error)
      }
    }

  }

  const getDonorsByBlood = async (blood_group) => {
    try {
      const donors = await users
      .where('bloodgroup', '==', blood_group)
      .get();
    if (donors.size > 0) {
      const donorsarray = [];
      donors.forEach(doc => {
        donorsarray.push(doc.data());
      });
      setAvailableDonorsByBlood(donorsarray);
    }
    else {
      setAvailableDonorsByBlood([]);
    }
    } catch (error) {
      console.log("Get Donors By Blood Error", error)
    }
  } 



  const makeBloodRequest = (data) => {
    const uploaded_data = {
      id: auth().currentUser.uid,
      ...data,
      sender_address: formattedAddress,
      sender_city: city,
      requestStatus: 1,
    }
    setIsLoading(true);
    bloodrequests.add(uploaded_data)
      .then(async () => {
        setIsLoading(false);
        setRequestLocation(null);
        setShowToast(true);
        const notification = {
          title: "Blood Request",
          body: `${user.name} sent you a request for blood`,
        }
        if (data.donor_id != '') {
          const get_user = await getUserById(data.donor_id);
          if (get_user) {
            sendNotification(notification, { screen: 'ManageRequestsScreen' }, [get_user.token]);
          }
        }
        else {
          const tokens = await getAllDeviceTokens();
          if (tokens) {
            sendNotification(notification, { screen: 'ManageRequestsScreen' }, tokens);
          }

        }
      })
      .catch(() => {
        console.log("Blood Request adding error : ", error)
      });

  }

  const makeUrgentBloodRequest = (data) => {
    const uploaded_data = {
      id: auth().currentUser.uid,
      ...data,
      sender_address: formattedAddress,
      sender_city: city,
      requestStatus: 1,
    }
    setIsLoading(true);
    urgentbloodrequests.add(uploaded_data)
      .then(async () => {
        setIsLoading(false);
        setRequestLocation(null);
        setShowToast(true);
        const notification = {
          title: "Urgent Blood Request",
          body: `${user.name} sent you a request for blood`,
        }
        const tokens = await getAllDeviceTokens();
        if (tokens) {
          sendNotification(notification, { screen: 'ManageRequestsScreen' }, tokens);
        }
      })
      .catch(() => {
        console.log("Blood Request adding error : ", error)
      });

  }

  const getRequesters = async () => {
    try {
      const requester = await bloodrequests
        .where('id', '!=', user.id)
        .where('donor_id', '==', "")
        .get();
      if (requester.size > 0) {
        const requesterArray = [];
        requester.forEach(doc => {
          requesterArray.push(doc.data());
        });
        setRequesters(requesterArray);
      }
      else {
        setRequesters([]);
      }

    } catch (error) {
      console.log("Get Requesters Error Error", error)
    }
  }

  const getUrgentRequesters = async () => {
    try {
      const requester = await urgentbloodrequests
        .where('id', '!=', user.id)
        .get();
      if (requester.size > 0) {
        const requesterArray = [];
        requester.forEach(doc => {
          requesterArray.push(doc.data());
        });
        setUrgentRequesters(requesterArray);
      }
      else {
        setUrgentRequesters([]);
      }

    } catch (error) {
      console.log("Get Urgent Requester Error", error);
    }


  }



  const sendMessage = (message) => {
    messages_collection.doc(message._id)
      .set({
        ...message
      })
      .then(async () => {
        console.log('Message added!');
        let doc = null;
        const doc_id = message.sender_id.trim() + "_" + message.receiver_id.trim();
        const rev_doc_id = message.receiver_id.trim() + "_" + message.sender_id.trim();
        const document = await isDocExist(chats, doc_id);
        const rev_document = await isDocExist(chats, rev_doc_id);
        if (document) {
          doc = chats.doc(doc_id);
        }
        else if (rev_document) {
          doc = chats.doc(rev_doc_id);
        }
        else {
          chats.doc(doc_id).set({
            sender_id: message.sender_id,
            receiver_id: message.receiver_id,
            last_message: message.text ? message.text : '',
            createdAt: message.createdAt
          }).then(() => {
            console.log("Chat Head Created");
          }).catch((err) => console.log(err));
        }

        if (doc != null) {

          doc.update({
            last_message: message.text ?  message.text : '',
            createdAt: message.createdAt
          })
            .then(() => {
              console.log('Chat Head updated!');
            }).catch((err) => console.log(err));
        }

      })
      .catch(err => console.log(err));

  }


  const uploadMessageImage = async (image_path) => {
    try {
      const image_id = Math.round(Math.random() * 1000000).toString();
      console.log(image_path);
      console.log(image_id);
      const reference = storage().ref('images/messages/' + image_id);
      await reference.putFile(image_path)
      const url = await storage().ref('images/messages/' + image_id).getDownloadURL();
      if (url) {
        return url;
      }
      else{
        return false;
      }
    } catch (error) {
      console.log("Error to upload message image");
    }
  }






  const value = {
    getUserCurrentLocation,
    getFormattedAddress,
    getGeometryAddress,
    toggleStatus,
    getAvailableDonor,
    userCurrentLocation,
    availableDonors,
    formattedAddress,
    city,
    country,
    user,
    modalVisible,
    setModalVisible,
    makeBloodRequest,
    requestLocation,
    getRequestGeometryAddress,
    requesters,
    urgentRequesters,
    getRequesters,
    isLoading,
    makeUrgentBloodRequest,
    showToast,
    urgentRequesters,
    getUrgentRequesters,
    sendMessage,
    setShowToast,
    getDonorsByBlood,
    availableDonorsByBlood,
    uploadMessageImage,
    shareLocation,
    setShareLocation

  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContentApi, AppContext }