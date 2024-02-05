import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Main/HomeScreen';
import NearbyScreen from '../screens/Main/NearbyScreen';
import HistoryScreen from '../screens/Main/HistoryScreen';
import MessagesScreen from '../screens/Main/MessagesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();


const tabBarIcons = (route, focused) => {
  let iconName;
  let rn = route.name;
  if (rn === "Home") {
    iconName = focused ? 'home' : 'home';
  }
  else if (rn === "Nearby") {
    iconName = focused ? 'location' : 'location';
  }
  else if (rn === "Messages") {
    iconName = focused ? 'chatbubbles' : 'chatbubbles';
  }
  else {
    iconName = focused ? 'sync' : 'sync';
  }
  return <Ionicons name={iconName} size={28} color={focused ? colors.white : colors.red_200} />

}

const screenOptions = ({ route, navigation }) => {
  return {
    showIcon: true,
    headerShown: true,
    headerTintColor: colors.white,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: colors.red,
      height: 60,
    },
    headerStyle: {
      backgroundColor: colors.red,
    },
    headerTitleStyle: {
      fontFamily: 'Kalam-Regular',
      fontSize: 24,
    },
    tabBarIcon: ({ focused }) => {
      return tabBarIcons(route, focused)
    },
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={28} color={colors.white} style={{ marginRight: 20 }} />
        </TouchableOpacity>
      </View>
    ),
  }
}

function Tabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "LifeLine",
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyScreen}
        options={{
          title: "Nearby",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: "Chats",
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "History",
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs