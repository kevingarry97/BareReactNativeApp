import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms';
import Screen from '../components/screen';
import colors from '../config/colors';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
});

const ForgotScreen = ({navigation}) => {

    const handleSubmit = ({email}) => {
        console.log('Email ', email)
        navigation.navigate('Reset')
    }

    return (  
        <Screen style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.text}>Please enter your registered email and you will receive the new PIN to use when registering.</Text>
            <AppForm
                initialValues={{email: ''}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error="Invalid email" visible={true} />
                <Text style={styles.label}>Email:</Text>
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    name="email"
                    placeholder="Type your email"
                    textContentType="emailAddress"
                />
                <View style={{alignItems: 'flex-end', marginVertical: 20}}>
                    <SubmitButton width="30%" title="Send" />
                </View>
            </AppForm>
            <View  style={{alignSelf: 'center', position: 'absolute', bottom: 15, flexDirection: 'row'}}>
                <Text style={styles.links}>Remember Password ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.links, {color: colors.warning}]}>Leave Now </Text>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        paddingTop: 60,
        backgroundColor: colors.white,
    },
    label: {
        marginTop: 15
    },
    links: {
        fontSize: 14
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
        color: colors.black_70,
        marginBottom: 25
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.dark_50,
        marginBottom: 30
    }
})
 
export default ForgotScreen;