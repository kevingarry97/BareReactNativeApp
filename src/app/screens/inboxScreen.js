import React, {useContext, useEffect, useRef, useState} from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../components/screen';
import colors from '../config/colors';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import Message from '../api/message';
import CompanyContext from '../context/companyContext';
import helper from '../helpers/helper';
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';
import moment from 'moment';
import Pusher from 'pusher-js/react-native';
import AuthContext from '../auth/context';

const InboxScreen = ({navigation, route}) => {
    const {user} = useContext(AuthContext)
    const scrollViewRef = useRef();
    const {company} = useContext(CompanyContext);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState(route.params.user.messages ?? []);
    const [value, setText] = useState(route.params.user.title.split(',')[0] !== company.phone_numbers[0] ? route.params.user.title.split(',')[0] : route.params.user.title.split(',')[1] ?? '');
    const [image, setImage] = useState([]);
    
    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if(!granted) alert("You need to enable permission to access images")
    }
    
    const handlePress = () => {
        pickImage();
    }
    
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 0.5,
            });
            if(!result.cancelled) {
                setImage([...image, result.uri]);
            }
        } catch (error) {
            console.log("Error reading an image", error)
        }
    };
    
    const handleDelete = (value) => {
        const newData = image.filter(img => img !== value);
        Alert.alert('Delete', 'Are you sure you want to delete this image', 
        [{text: 'Yes', onPress: () => setImage(newData)}, {text: 'No'}])
        
    }

    const handleSubmit = async () => {
        setLoading(true);
        const obj = {
            from: company.phone_numbers[0],
            to: value,
            content: message,
            image
        }
        const result = await Message.sendMessage(obj);
    }

    
    useEffect(() => {
        var pusher = new Pusher("3283525c429951b8738d", {
            cluster: "us3",
            authEndpoint: 'https://gbpn.com/api/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: 'Bearer ' + user
                }
            }
        });
        const channel = pusher.subscribe('private-conversations.18326328103');
    
        channel.bind('message-event', (data) => {
            delete data.data.conversation; 
            setMessages(prev => [...prev, data.data]); 
            setLoading(false);
            setMessage('');
            setImage([]);
        })
        
        requestPermission();
        
        return () => pusher.unsubscribe('private-conversations.18326328103');
    }, [])

    return (  
        <Screen>
            <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
                <AntDesign name="close" size={20} color={colors.warning} />
            </TouchableOpacity>
            <View style={styles.topBox}>
                <Text style={styles.text}>To:</Text>
                <View style={{paddingHorizontal: 10, borderRadius: 20, paddingVertical: 1, marginLeft: 9, backgroundColor: colors.white}}>
                    <TextInput 
                        focusable
                        style={{ color: colors.black_70, fontWeight: '700', marginLeft: 5, flexGrow: 1 }}
                        onChangeText={text => setText(text)}
                        value={helper.formatPhoneNumber(`${value}`)}
                    />
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20, marginBottom: 10}}
            >
                {messages.length <= 0 ? (
                    <View style={styles.card}>
                        <Text> No Message </Text>
                        <Image source={require('../../assets/images/folder.png')} style={styles.image} />
                    </View>
                ) : (
                    _(messages)
                    .groupBy(c => moment(c.created_at).format('MMMM DD YYYY'))
                    .map((value, key) => (
                        <View key={key}>
                            <Text style={styles.date}>{moment(key).format('dddd, MMMM DD, YYYY')}</Text>
                            {value.map((message, i) => (
                                <View key={i} style={[styles.message, message?.receiver?.phone_number !== company.phone_numbers[0] ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start', backgroundColor: colors.info_light} ]}>
                                    {message?.media_urls?.length > 0 && message?.media_urls?.map((path, i) => <Image key={i} source={{uri: path.url}} style={{width: 100, height: 100, resizeMode: 'contain', marginVertical: 5, borderRadius: 10}} />)}
                                    <Text style={styles.sms}>{message.message}</Text>
                                </View>
                            ))}
                        </View>
                    )).value()
                )}
                <View style={{ alignItems: 'flex-end'}}>
                    {(message || image) && loading ? 
                        <>
                            <View style={[styles.message]}> 
                                <Text>{message}</Text>
                            </View> 
                            <Text style={styles.small}>Sending...</Text>
                        </>
                    : null
                    }
                </View>
            </ScrollView>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, backgroundColor: colors.danger_light, marginVertical: 5, marginRight: 10}}>
                {image.length> 0 && image.map((img, index) => (
                    <TouchableOpacity key={index} onPress={() => handleDelete(img)}>
                        <Image source={{uri: img}} style={{width: 60, height: 60, marginHorizontal: 5, resizeMode: 'stretch', borderRadius: 5}} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.bottomBar}>
                <View style={styles.form_group}>
                    <TextInput
                        placeholder="Enter message"
                        multiline
                        value={message}
                        editable={!loading} 
                        selectTextOnFocus={!loading}
                        style={{width: '90%'}}
                        onChangeText={(val) => setMessage(val)}
                    />
                    <TouchableOpacity style={{marginTop: 5}} onPress={handlePress}>
                        <Entypo name="attachment" size={20} color={colors.black_70} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.send} onPress={handleSubmit}>
                    <Feather name="send" size={22} color={colors.success} style={{marginTop: 3, marginRight: 4}} />
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    card: {
        width: '70%',
        flex: 0.6,
        backgroundColor: colors.info_light,
        alignItems: 'center',
        justifyContent: 'center'
    },
    close: {
        backgroundColor: colors.danger_light,
        color: colors.danger_50,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 10
    },
    date: {
        marginVertical: 10,
        fontSize: 12,
        textAlign: 'center',
        paddingBottom: 10,
        color: colors.dark_50,
    },
    form_group: {
        backgroundColor: colors.info_light,
        paddingHorizontal: 13,
        paddingVertical: 7,
        width: '85%',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginTop: 30
    },
    imageContainer: {
        alignItems: 'center',
        backgroundColor: colors.danger_50,
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        width: 50,
        overflow: 'hidden',
        marginVertical: 10,
        marginHorizontal: 20
    },
    message: {
        paddingVertical: 4,
        paddingHorizontal: 13,
        borderRadius: 20,
        marginVertical: 5,
        backgroundColor: colors.danger_light
    },
    send: {
        width: 40,
        height: 40,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.success_light
    },
    small: {
        fontSize: 12,
        color: colors.medium
    },
    sms: {
        color: colors.dark_50,
        fontSize: 14
    },
    text: {
        fontSize: 13,
        color: colors.dark_50
    },
    topBox: {
        backgroundColor: colors.muted,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    }
})
 
export default InboxScreen;