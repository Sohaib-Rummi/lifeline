import React from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const LocationMessage = ({ location }) => {
    const navigation = useNavigation();
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    return (
        location && <TouchableOpacity style={{marginVertical:10, borderRadius:10, width:150, height:150, overflow:'hidden'}} onPress={() => navigation.navigate('Map', {location:location, state:true})}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ height: 150, width: 150}}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
                }}
                annotations={[
                    {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                ]}
                scrollEnabled={false}
                zoomEnabled={false}
            >
                {
                    <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    pinColor={colors.red}
                />
            }
            </MapView>
        </TouchableOpacity>
    )
}

export default LocationMessage;