import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../components/screen';
import SearchBox from '../components/searchBox';
import colors from '../config/colors';
import { FontAwesome, FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Navigation from '../components/navigation';
import AddCaller from '../components/addCaller';
import useApi from '../hooks/useApi';
import Calls from '../api/calls';
import Company from '../api/company';
import ActivityIndicator from '../components/activityIndicator';
import helper from '../helpers/helper';
import CompanyContext from '../context/companyContext';
import { useIsFocused } from "@react-navigation/native";
import _ from 'lodash';
import moment from 'moment';
import DateContext from '../context/dateContext';


const RecentScreen = ({ navigation }) => {
    const { company, setCompany } = useContext(CompanyContext)
    // const { data: calls, error, loading, request: loadCalls } = useApi(Calls.getCalls);
    moment.suppressDeprecationWarnings = true;
    const { request: loadCompany } = useApi(Company.getCompany)
    const [loading, setLoading] = useState(true);
    const [calls, setCalls] = useState([])
    const isFocused = useIsFocused();
    const {selectedRange: dates} = useContext(DateContext);

    const loadCalls = async () => {
        setLoading(true);
        const {data} = await Calls.getCalls(dates?.firstDate, dates?.secondDate);
        setCalls(data);
        setLoading(false);
    }

    const handleCall = async (value) => {
        const result = await Company.getCompany(value.uuid);

        loadCalls();
        // navigation.navigate('Dial', { data: value })
    }

    useEffect(() => {
        if (isFocused) {
            loadCompany(company?.uuid);
            loadCalls();
        }
    }, [isFocused]);

    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.title}>Calls</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Date', {where: 'Recent'})}>
                        <MaterialIcons name="date-range" size={20} color={colors.info_50} />
                    </TouchableOpacity>
                </View>
                <AddCaller handleSubmit={(values) => handleCall(values)} />
                <SearchBox value={""} onChange={(value) => console.log(value)} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                    {calls && _(calls?.data)
                    .groupBy(c => moment(c.created_at).format('MMMM DD YYYY'))
                    .map((value, key) => (
                        <View key={key}>
                            <Text style={styles.info}>{moment(key).format('dddd, MMMM DD, YYYY')}</Text>
                            {value.map((call, i) => (
                                <View key={i} style={styles.contentContainer}>
                                    <View style={styles.media}>
                                        <View style={styles.avatar}>
                                            <FontAwesome5 name="user-alt" size={15} color={colors.info_50} />
                                        </View>
                                        <View style={styles.mediaBody}>
                                            <Text style={styles.phone}>{call.direction === 'inbound' ? helper.formatPhoneNumber(`${call.from}`) : helper.formatPhoneNumber(`${call.to}`)}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={styles.date}>{helper.convertTime(call.duration)}</Text>
                                                <Text style={styles.small}>  ({moment(call.created_at).format('hh:mm a')})</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.options}>
                                        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                            <FontAwesome name="phone" size={20} color={colors.success} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                            <FontAwesome5 name="envelope" size={21} color={colors.warning} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )).value()
                }
                </ScrollView>
                
                {/* <TouchableOpacity onPress={() => navigation.navigate('Dial')} style={styles.keyBar}>
                    <Ionicons name="keypad" size={30} color={colors.success} />
                </TouchableOpacity> */}
                <Navigation active="Recent" />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: colors.muted,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        paddingHorizontal: 20,
        marginTop: 15,
        paddingBottom: 25
    },
    container: {
        marginTop: 25
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 15,
        borderBottomColor: colors.black_50,
        borderBottomWidth: .5
    },
    date: {
        color: colors.medium,
        paddingTop: 5,
        fontSize: 12
    },
    dateContainer: {
        flex: 1,
        position: 'absolute',
    },
    info: {
        color: colors.black_70,
        fontWeight: '700',
        backgroundColor: colors.info_light,
        padding: 5
    },
    keyBar: {
        width: 55,
        height: 55,
        backgroundColor: colors.success_light,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 27.5,
        position: 'absolute',
        bottom: 65,
        right: 10

    },
    media: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mediaBody: {
        paddingLeft: 10
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    phone: {
        fontSize: 17,
        color: colors.black_70
    },
    small: {
        fontSize: 11,
        color: colors.dark_70,
        marginTop: 5
    },
    title: {
        fontSize: 24,
        color: colors.dark_50,
        fontWeight: '700'
    },
    topBar: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default RecentScreen;
