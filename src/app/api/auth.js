import client from './client';

const login = (email, password) => client.post('/auth', { email, password})

const whoAmI = () => client.get('/who-am-i');

export default {
    login,
    whoAmI
}