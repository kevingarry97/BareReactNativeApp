import client from './client';

const getVoiceMails = () => client.get('/voicemail');

export default {
    getVoiceMails
}