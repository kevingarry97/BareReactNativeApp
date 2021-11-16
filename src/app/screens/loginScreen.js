import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Screen from '../components/screen';
import colors from '../config/colors';
import * as Yup from "yup";
import {AppForm, AppFormField, ErrorMessage, SubmitButton} from '../components/forms';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = ({navigation}) => {
    const {login, loginAuth} = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async ({email, password}) => {
        const result = await authApi.login(email, password);
        if(!result.ok) return setLoginFailed(true);

        setLoginFailed(false);
        loginAuth(result?.data?.app_auth_token)
        login(result?.data?.bearer_token)
        
    }

    return ( 
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                <Screen style={styles.inner}>
                    <View style={{flex: .5, alignItems: 'center', justifyContent: 'center', paddingTop: 100}}>
                        <Image source={require('../../assets/images/image.png')} style={{resizeMode: 'contain', width: 300, height: 200}} />
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.title}>Login</Text>
                        <AppForm
                            initialValues={{email: '', password: ''}}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            <ErrorMessage error="Invalid email and/or password" visible={loginFailed} />
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="email"
                                keyboardType="email-address"
                                name="email"
                                placeholder="Email"
                                textContentType="emailAddress"
                            />
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="lock"
                                name="password"
                                placeholder="Password"
                                secureTextEntry
                                textContentType="password"
                            />
                            <View style={{alignItems: 'flex-end', marginVertical: 30}}>
                                <SubmitButton width="40%" title="Continue" />
                            </View>
                        </AppForm>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Forgot')}>
                            <Text style={{color: colors.black_70}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </Screen>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: colors.white,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        padding: 20,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    container: {
        flex: 1
    },
    inner: {
        backgroundColor: colors.muted,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        marginBottom: 20

    }
})
 
export default LoginScreen;