import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../components/screen';
import SearchBox from '../components/searchBox';
import colors from '../config/colors';
import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Navigation from '../components/navigation';
import useApi from '../hooks/useApi';
import voiceMails from '../api/voice';
import helper from '../helpers/helper';
import { Audio } from 'expo-av';
import AddCaller from '../components/addCaller';
import Company from '../api/company';
import CompanyContext from '../context/companyContext';
import ActivityIndicator from '../components/activityIndicator';
import moment from 'moment';
import _ from 'lodash';
import DateContext from '../context/dateContext';

const VoiceScreen = ({navigation}) => {
    const [currentAudio, setCurrentAudio] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState();
    moment.suppressDeprecationWarnings = true;
    const audio = useRef(new Audio.Sound());
    const {selectedRange: dates} = useContext(DateContext)

    const {company} = useContext(CompanyContext);
    const {data: voices, error, loading, request: loadVoices} = useApi(voiceMails.getVoiceMails);
    const {request: loadCompany} = useApi(Company.getCompany)

    const handleCall = async (value) => {
        const result = await Company.getCompany(value.uuid);
        
        loadVoices();
    }
    
    const handleAudio = async (value) => {
        setSound(audio.current);
        audio.current.setOnPlaybackStatusUpdate(async (status) => {
            if (status.didJustFinish === true) {
                await audio.current.unloadAsync();
                setIsPlaying(false);
            } 
        });
        const checkLoad = await audio.current.getStatusAsync();
        
        if(!checkLoad.isLoaded || currentAudio.id !== value.id) {
            if(currentAudio.id !== value.id) {
                await audio.current.unloadAsync();
                await audio.current.loadAsync({uri: value.file_url});
                setCurrentAudio(value)
                await audio.current.playAsync();
                setIsPlaying(true);
            } else {
                await audio.current.loadAsync({uri: value.file_url});
                setCurrentAudio(value)
                await audio.current.playAsync();
                setIsPlaying(true);
            }
        }
        if(checkLoad.isLoaded && checkLoad.isPlaying && currentAudio?.id === value.id) {
            await audio.current.pauseAsync();
            setIsPlaying(false);
        } 
        if(checkLoad.isLoaded && !checkLoad.isPlaying && currentAudio?.id === value.id) {
            const status = await audio.current.playAsync();
            setIsPlaying(true)
        }
    }

    useEffect(() => {

        loadCompany(company?.uuid);
        loadVoices();

        return sound ? () => {
          console.log('Unloading Sound');
          sound?.unloadAsync();
        }
        : undefined;
    }, [sound]);

    return (  
        <>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.title}>Voice Mails</Text>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Date', {where: 'Voice'})}>
                        <MaterialIcons name="date-range" size={20} color={colors.info_50} />
                    </TouchableOpacity> */}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <AddCaller handleSubmit={(value) => handleCall(value)} />
                </View>
                <View>
                    <SearchBox value={""} onChange={(value) => console.log(value)} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                    {voices && _(voices?.data)
                    .groupBy(v => moment(v.date).format('MMMM DD YYYY'))
                    .map((value, key) => (
                        <View key={key}>
                            <Text style={styles.info}>{moment(key).format('dddd, MMMM DD, YYYY')}</Text>
                            {value.map((voice, i) =>
                                <TouchableOpacity key={i} onPress={() => handleAudio(voice)} style={styles.contentContainer}>
                                    <View style={styles.media}>
                                        <View style={styles.avatar}>
                                            <FontAwesome5 name="user-alt" size={15} color={colors.info_50} />
                                        </View>
                                        <View style={styles.mediaBody}>
                                            <Text style={styles.phone}>{helper.formatPhoneNumber(`${voice.caller}`)}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Ionicons name={((currentAudio.id === voice.id) && isPlaying) ? "pause" : "play-sharp"} size={12} color={colors.medium} style={{marginTop: 5}} />
                                                <Text style={styles.subTitle}>{helper.convertTime(voice.duration)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.options}>
                                        {/* <Text style={styles.date}>1d ago</Text> */}
                                        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                            <FontAwesome name="phone" size={22} color={colors.success} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                                            <FontAwesome5 name="envelope" size={21} color={colors.warning} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))
                    .value()
                }
                </ScrollView>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Inbox')} style={styles.keyBar}>
                    <MaterialCommunityIcons name="email-send" size={30} color={colors.white} />
                </TouchableOpacity> */}
                <Navigation active="Voice" />
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
        color: colors.black_50,
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
 
export default VoiceScreen;