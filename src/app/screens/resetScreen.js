import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms';
import Screen from '../components/screen';
import colors from '../config/colors';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    password: Yup.string().required().email().label("Password"),
    confirm_password: Yup.string().required().email().label("Confirm Password"),
});

const ResetScreen = () => {
    const handleSubmit = ({password, confirm_password}) => {
        console.log('Email ', password , ' Confirm: ', confirm_password)
    }

    return (  
        <Screen style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.text}>Your new password must be different from the previous used password</Text>
            <AppForm
                initialValues={{password: '', confirm_password: ''}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error="Invalid email" visible={true} />
                <Text style={styles.label}>Password:</Text>
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <Text style={styles.label}>Confirm Password:</Text>
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <View style={{alignItems: 'flex-end', marginVertical: 20}}>
                    <SubmitButton width="30%" title="Reset" />
                </View>
            </AppForm>
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
 
export default ResetScreen;