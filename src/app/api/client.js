import { create } from 'apisauce';
import authStorage from '../auth/storage';

const apiClient = create({
    baseURL: 'https://gbpn.com/api'
});


apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getToken();
    if(!authToken) return;
    
    request.headers['Authorization'] = 'Bearer ' + authToken;
});

apiClient.axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        console.log('Unauthenticated')
    }
})

export default apiClient;