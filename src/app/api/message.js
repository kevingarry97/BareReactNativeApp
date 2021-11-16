import client from './client';

const getMessage = (phone) => client.get('/sms/conversations?phone_numbers[]=' + phone);

const sendMessage = (payload) => {
    const data = new FormData();
    data.append('from', payload.from);
    data.append('to', payload.to);
    data.append('content', payload.content);
    payload.image.forEach((image, index) => data.append('files[' + index + ']', {
        name: 'files' + index,
        type: 'image/jpeg',
        uri: image
    }));

    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    return client.post('/sms/messages', data, headers);
}

export default {
    getMessage,
    sendMessage
}