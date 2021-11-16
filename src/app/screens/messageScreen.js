import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../components/screen';
import SearchBox from '../components/searchBox';
import colors from '../config/colors';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Navigation from '../components/navigation';
import AddCaller from '../components/addCaller';
import Message from '../api/message';
import CompanyContext from '../context/companyContext';
import auth from '../api/auth';
import ActivityIndicator from '../components/activityIndicator';
import moment from 'moment';
import _ from 'lodash';
import helper from '../helpers/helper';
import { useIsFocused } from '@react-navigation/native'

const MessageScreen = ({navigation}) => {
    const [messages, setMessages] = useState([])
    const {company} = useContext(CompanyContext)
    const [loading, setLoading] = useState(false);
    const isfocused = useIsFocused();

    const populateConversations = async () => {
        setLoading(true)
        const {data} = await auth.whoAmI()
        const messages = await Message.getMessage(company === undefined ? data?.data?.companies[0] : company?.phone_numbers[0]);
        setLoading(false)
        setMessages(messages.data);
    }

    useEffect(() => {
        if(isfocused)
            populateConversations();
    }, [company, isfocused])

    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.title}>Messages</Text>
                </View>
                <AddCaller handleSubmit={() => console.log('Hello Sir')} />
                <View>
                    <SearchBox value={""} onChange={(value) => console.log(value)} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                    {_(messages?.data)
                    .groupBy(c => moment(c.updated_at).format('MMMM DD YYYY'))
                    .map((value, key) => (
                        <View key={key}>
                            <Text style={styles.info}>{moment(key).format('dddd, MMMM DD, YYYY')}</Text>
                            {value
                            .map((m, i) => (
                                <TouchableOpacity key={i} style={styles.contentContainer} onPress={() => navigation.navigate('Inbox', {user: m})}>
                                    <View style={styles.media}>
                                        <View style={styles.avatar}>
                                            <FontAwesome5 name="user-alt" size={15} color={colors.info_50} />
                                        </View>
                                        <View style={styles.mediaBody}>
                                            <Text style={styles.phone}>{m.title.split(',')[0] !== company.phone_numbers[0] ? helper.formatPhoneNumber(`${m.title.split(',')[0]}`) : helper.formatPhoneNumber(`${m.title.split(',')[1]}`)}</Text>
                                            <Text style={styles.date}>({moment(m.updated_at).startOf('hour').fromNow()})</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )).value()
                }
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('Inbox')} style={styles.keyBar}>
                    <MaterialCommunityIcons name="email-send" size={30} color={colors.white} />
                </TouchableOpacity>
                <Navigation active="Message" />
            </Screen>
        </>  
    );
}

const styles = StyleSheet.create({
    add: {
        width: 40,
        height: 40,
        backgroundColor: colors.success_light,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderRadius: 20
    },
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
    card: {
        backgroundColor: colors.info_light,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5
    },
    container: {
        marginTop: 45
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
        color: colors.black_70,
        paddingTop: 5,
        fontSize: 12
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
        backgroundColor: colors.success,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 27.5,
        position: 'absolute',
        bottom: 65,
        right: 10

    },
    list: {
        paddingLeft: 10
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
    subText: {
        fontSize: 11,
        color: colors.black_70
    },
    subTitle: {
        color: colors.medium,
        paddingTop: 5,
        fontSize: 12
    },
    title: {
        fontSize: 24,
        color: colors.dark_50,
        fontWeight: '700'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingBottom: 10
    }
})

export default MessageScreen;