import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../SplashScreen';
import SignInScreen from '../SignInScreen';
import SignUpScreen from '../SignUpScreen';
import HomeScreen from '../HomeScreen';
import CategoryScreen from '../CategoryScreen';
import ShopScreen from '../ShopScreen';
import SearchScreen from '../SearchScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator  headerShown = 'false'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="HomeScreen" component={HomeScreen}/>
        <RootStack.Screen name="CategoryScreen" component={CategoryScreen}/>
        <RootStack.Screen name="ShopScreen" component={ShopScreen}/>
        <RootStack.Screen name="SearchScreen" component={SearchScreen}/>
        
    </RootStack.Navigator>
);

export default RootStackScreen;