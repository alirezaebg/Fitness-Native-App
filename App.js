import 'react-native-gesture-handler';
import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { purple, white, pink } from "./utils/colors";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Constants from 'expo-constants'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  History: {
    name: "History",
    component: History,
    options: { tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'History' }
  },
  AddEntry: {
    component: AddEntry,
    name: "Add Entry",
    options: { tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Entry' }
  }
}

const TabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? pink : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tab = Platform.OS === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator()


export default class App extends React.Component {
  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <NavigationContainer>
          <Tab.Navigator {...TabNavigatorConfig}>
            <Tab.Screen {...RouteConfigs['History']} />
            <Tab.Screen {...RouteConfigs['AddEntry']} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}