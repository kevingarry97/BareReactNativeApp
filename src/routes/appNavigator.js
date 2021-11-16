import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecentScreen from '../app/screens/recentScreen';
import MessageScreen from '../app/screens/messageScreen';
import DialScreen from '../app/screens/dialScreen';
import InboxScreen from '../app/screens/inboxScreen';
import VoiceScreen from '../app/screens/voiceScreen';
import ProfileScreen from '../app/screens/profileScreen';
import DateScreen from '../app/screens/dateScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Recent" component={RecentScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="Dial" component={DialScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="Voice" component={VoiceScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Date" component={DateScreen} />
    </Stack.Navigator>
)

export default AppNavigator;