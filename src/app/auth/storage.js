import * as SecureStore from 'expo-secure-store';

const key = "authToken"

const storeToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync(key, authToken)
    } catch (error) {
        console.log('Error storing the auth token', error)
    }   
}

const storeAuth = async (authToken) => {
    try {
        await SecureStore.setItemAsync('auth', authToken)
    } catch (error) {
        console.log('Error storing the auth token', error)
    }
}

const getAuth = async () => {
    try {
        return await SecureStore.getItemAsync('auth')
    } catch (error) {
       console.log('Error getting the auth token', error) 
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key)
    } catch (error) {
       console.log('Error getting the auth token', error) 
    }
}

const getAccess = async () => {
    const token = await getAuth();
    return (token) ? token : null;
}

const getUser = async () => {
   const token = await getToken();
   return (token) ? token : null; 
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key) 
    } catch (error) {
        console.log('Error removing the auth token', error)
    }
}

const removeAuth = async () => {
    try {
        await SecureStore.deleteItemAsync('auth') 
    } catch (error) {
        console.log('Error removing the auth token', error)
    }
}

export default { getToken, getUser, storeToken, removeToken, removeAuth, getAccess, getAuth, storeAuth }