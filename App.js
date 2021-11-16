import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import AuthContext from './src/app/auth/context';
import AppNavigator from './src/routes/appNavigator';
import AuthNavigator from './src/routes/authNavigator';
import navigationTheme from './src/routes/navigationTheme';
import authStorage from './src/app/auth/storage';
import CompanyContext from './src/app/context/companyContext';
import DateContext from './src/app/context/dateContext';
import auth from './src/app/api/auth';

export default function App() {
  const [company, setCompany] = useState('');
  const [selectedRange, setRange] = useState('');
  const [user, setUser] = useState('');
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const { data } = await auth.whoAmI();
    setCompany(data?.data?.companies[0]);
    const newUser = await authStorage.getUser();
    if (newUser && data) setUser(newUser);
  }

  if (!isReady) return <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} onError={console.warn} />

  return (
    <DateContext.Provider value={{ selectedRange, setRange }}>
      <CompanyContext.Provider value={{ company, setCompany }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <NavigationContainer theme={navigationTheme}>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      </CompanyContext.Provider>
    </DateContext.Provider>
  );
}
