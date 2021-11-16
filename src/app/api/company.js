import client from './client';

const getCompany = (uuid) => client.post(`/select-company/${uuid}`);

export default {
    getCompany
}