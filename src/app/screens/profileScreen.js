import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../components/screen';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Navigation from '../components/navigation';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import auth from '../api/auth';

const ProfileScreen = () => {
    const {logOut} = useAuth();
    const {data: user, error, loading, request: loadUser} = useApi(auth.whoAmI);
    
    useEffect(() => {
        loadUser();
    }, []);
    
    return (  
        <Screen style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.avatar}>
                    <MaterialCommunityIcons name="account-key" size={40} color={colors.success} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="alert" size={18} color={colors.warning} style={{marginTop: 9}} />
                    <Text style={styles.text}>Can't change profile for now</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <Text style={styles.top}>Account Info:</Text>
                <View style={styles.form_group}>
                    <Text style={styles.label}>Names:</Text>
                    <Text style={styles.form_control}>{user?.data?.name}</Text>
                </View>
                <View style={styles.form_group}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.form_control}>{user?.data?.email}</Text>
                </View>
                <View style={styles.form_group}>
                    <Text style={styles.label}>UUID:</Text>
                    <Text style={styles.form_control}>{user?.data?.uuid.slice(0, 15) + '.....'}</Text>
                </View>
                <Text style={[styles.top, {marginTop: 15}]}>Other Options:</Text>
                <TouchableOpacity onPress={() => logOut()} style={styles.button}>
                    <Text style={styles.logOut}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
            <Navigation active="Profile" />
        </Screen>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 95,
        height: 95,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 47.5,
        backgroundColor: colors.success_light
    },
    button: {
        backgroundColor: colors.danger_light,
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 5
    },
    container: {
        marginTop: 20,
    },
    content: {
        marginVertical: 30,
        marginHorizontal: 20
    },
    form_control: {
        fontSize: 15,
        color: colors.black_70,
        marginTop: 3
    },
    form_group: {
        backgroundColor: colors.info_light,
        marginVertical: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 7
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.dark_70
    },
    logOut: {
        fontSize: 19,
        fontWeight: '700',
        color: colors.warning
    },
    text: {
        color: colors.warning,
        marginTop: 10,
        fontSize: 14,
        marginLeft: 5
    },
    top: {
        color: colors.black_70,
        fontSize: 13,
        marginBottom: 8
    },
    topBar: {
        alignItems: 'center'
    }
})
 
export default ProfileScreen;