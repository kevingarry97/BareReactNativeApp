import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../app/screens/loginScreen';
import ResetScreen from '../app/screens/resetScreen';
import ForgotScreen from '../app/screens/forgotScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Reset" component={ResetScreen} />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
    </Stack.Navigator>
)

export default AuthNavigator;