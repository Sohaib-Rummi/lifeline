import { PERMISSIONS, request, check } from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { FCM_SERVER_KEY, FCM_ENDPOINT } from '../constants/Const.js';
import axios from 'axios';
export const requestForLocationPermission = async () => {
    try {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } catch (error) {
        console.log(error);
    }

}


export const requestForNotificationPermission = async () => {
    try {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    } catch (error) {
        console.log(error)
    }
}

export const requestForStoragePermission = async () => {
    try {
        const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    } catch (error) {
        console.log(error);
    }

}

export const checkLocationPermission = async () => {
    try {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        return result;
    } catch (error) {
        console.log("Location Permission Check Error", error);
    }
}

export const checkStoragePermission = async () => {
    try {
        const result = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        return result;
    } catch (error) {
        console.log("Location Permission Check Error", error);
    }
}

export const checkNotificationPermission = async () => {
    try {
        const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        return result;
    } catch (error) {
        console.log("Location Permission Check Error", error);
    }
}

export const requestForeEableGPS = async () => {
    try {
        const data = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        });
        if (data === "enabled" || data === "already-enabled") {
            return true;
        }
    } catch (error) {
        console.log("GPS enabler error", error);
    }
}

export const sendNotification = async (notification, data, device_id) => {
    const payload = {
        registration_ids: device_id,
        notification: {
            title: notification.title,
            body: notification.body,
        },
        data: {
            screenName: data.screen, 
        },
    };
    try {
        const response = await axios.post(FCM_ENDPOINT, payload, {
            headers: {
                Authorization: `key=${FCM_SERVER_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Push notification sent:', response.data);
    } catch (error) {
        console.error('Error sending push notification:', error);
    }
}


