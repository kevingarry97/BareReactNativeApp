import moment from 'moment';
import client from './client';

const getCalls = (start_date = "2021-04-01", end_date = moment(Date.now()).format("YYYY-MM-DD")) => start_date ? client.get('/calls?start_date=' + start_date + '&end_date=' + end_date) : client.get('/calls')

export default {
    getCalls
}