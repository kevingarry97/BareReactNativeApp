import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../components/screen';
import colors from '../config/colors';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import Navigation from '../components/navigation';
import AddCaller from '../components/addCaller';
import helper from '../helpers/helper';
import call from 'react-native-phone-call'
import CompanyContext from '../context/companyContext';
import useAuth from '../auth/useAuth';

const DialScreen = ({navigation, route}) => {
    
    const {setCompany} = useContext(CompanyContext)
    const [text, setText] = useState('ghgh');
    const [speaker, setSpeaker] = useState(false);

    const data = route?.params?.data;

    const handleCall = () => {
        // TwilioVoice.connect(, {to: '+61234567890'})
    }
    
    useEffect(() => {
        setText(data ? helper.formatPhoneNumber(`${data?.phone_numbers[0]}`) : '');
    }, [data]);

    const handleCheck = async (value) => {
        setText(helper.formatPhoneNumber(`${value.phone_numbers[0]}`));
    }

    const changeText = (str) => {
        setText(str);
	}

    return (  
        <Screen>
            <TouchableOpacity style={{padding: 10}} onPress={() => navigation.goBack()}>
                <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <AddCaller handleSubmit={(val) => handleCheck(val)} />
            <ScrollView>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{helper.formatPhoneNumber(`${text}`) ?? text}</Text>
                </View>
                <VirtualKeyboard color={colors.dark_50} pressMode='string' onPress={(val) => changeText(val)} cellStyle={styles.cells} clearOnLongPress={true} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginHorizontal: 60}}>
                    <TouchableOpacity onPress={() => setSpeaker(!speaker)}>
                        <Feather name={speaker ? "volume-2" : "volume-x"} size={24} color={colors.black_70} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCall} style={styles.call}>
                        <FontAwesome name="phone" size={30} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="keyboard-voice" size={28} color={colors.black_70} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Navigation active="Recent" />
        </Screen>
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
    call: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.success,
        borderRadius: 10
    },
    cancel: {
        color: colors.info
    },
    card: {
        backgroundColor: colors.info_light,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5
    },
    cells: {
        paddingVertical: 10
    },
    list: {
        paddingLeft: 10
    },
    subText: {
        fontSize: 11,
        color: colors.black_70
    },
    text: {
        fontSize: 27,
        color: colors.dark_50
    },
    textContainer: {
        backgroundColor: colors.medium_lighter,
        paddingVertical: 10,
        alignItems: 'center'
    }
})
 
export default DialScreen;