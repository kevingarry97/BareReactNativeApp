import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';
import { AntDesign, MaterialIcons, Fontisto, Feather } from '@expo/vector-icons'; 
import DateContext from '../context/dateContext';

const Navigation = ({active}) => {
    const navigation = useNavigation();
    const {setRange} = useContext(DateContext);

    return (  
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Recent')} style={[styles.menu, active === 'Recent' && styles.active]}>
                <AntDesign name="home" size={19} color={colors.dark_70} />
                
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Message')} style={[styles.menu, active === 'Message' && styles.active]}>
                <Fontisto name="email" size={19} color={colors.dark_70} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.holder} onPress={() => navigation.navigate('Dial')}>
                <View style={styles.menu}>
                    <MaterialIcons name="dialpad" color={colors.white} size={27} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Voice')} style={[styles.menu, active === 'Voice' && styles.active]}>
                <Feather name="voicemail" size={19} color={colors.dark_70} />
                
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={[styles.menu, active === 'Profile' && styles.active]}>
                <AntDesign name="user" size={19} color={colors.dark_70} />   
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    active: {
        backgroundColor: colors.white,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17.5
    },
    alert: {
        backgroundColor: colors.danger,
        position: 'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 0, 
        borderRadius: 5, 
        width: 10, 
        height: 10
    },
    container: {
        backgroundColor: colors.info_light,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 17,
    },
    holder: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.success,
        height: 60,
        width: 60,
        marginTop: -35,
        borderRadius: 40,
    },
    menu: {
        alignItems: 'center',
    },
    name: {
        fontSize: 10,
        color: colors.medium,
        fontWeight: '700'
    },
    text: {
        fontSize: 8, 
        fontWeight: '700', 
        color: colors.white
    }
})
 
export default Navigation;