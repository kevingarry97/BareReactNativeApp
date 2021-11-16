import React, { useContext, useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../config/colors';
import { Feather } from '@expo/vector-icons';
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms';
import * as Yup from 'yup';
import useApi from '../hooks/useApi';
import auth from '../api/auth';
import helper from '../helpers/helper';
import CompanyContext from '../context/companyContext';

const validationSchema = Yup.object().shape({
    caller_name: Yup.string().required().label("Caller Name"),
    caller_category: Yup.string(),
    caller_number: Yup.string().required().label("Caller Number")
});

const AddCaller = ({ handleSubmit }) => {
    const { company: camps, setCompany } = useContext(CompanyContext)
    const [modalVisible, setModalVisible] = useState(false);
    const { data: company, error, loading, request: loadCompanies } = useApi(auth.whoAmI);

    useEffect(() => {
        loadCompanies();
    }, []);

    const renderOutsideTouch = (onTouch) => {
        const view = <View style={{ flex: 1, width: '100%' }} />

        if (!onTouch) return view;

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    const doSubmit = (values) => {
        console.log('Values ', values);
    }

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
                    {company?.data && company?.data?.companies?.map((company, i) => (
                        <TouchableOpacity key={i} onPress={() => { setCompany(company), handleSubmit(company) }} style={[styles.card, camps?.uuid === company.uuid && { backgroundColor: colors.info_50 }]}>
                            <Text style={[styles.subText, { fontWeight: '700' }]}>{company.name}</Text>
                            <Text style={styles.subText}>{helper.formatPhoneNumber(`${company.phone_numbers[0]}`)}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)}>
                    <Feather name="plus" size={24} color={colors.success} />
                </TouchableOpacity> */}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.container}>
                    {renderOutsideTouch(() => setModalVisible(false))}
                    <View style={styles.body}>
                        <Text style={styles.title}>Create Caller ID</Text>
                        <View style={{ paddingVertical: 15 }}>
                            <AppForm
                                initialValues={{ caller_name: '', caller_category: '', caller_number: '' }}
                                onSubmit={doSubmit}
                                validationSchema={validationSchema}
                            >
                                <ErrorMessage error="Please fill all inputs" visible={true} />
                                <AppFormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="account"
                                    name="caller_name"
                                    placeholder="Caller name"
                                />
                                <AppFormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="view-grid-plus"
                                    name="caller_category"
                                    placeholder="Caller category"
                                />
                                <AppFormField
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    icon="phone"
                                    autoCorrect={false}
                                    name="caller_number"
                                    placeholder="Caller number"
                                />
                                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                    <SubmitButton width="25%" color="success" title="Save" />
                                </View>
                            </AppForm>
                        </View>
                    </View>
                </View>
            </Modal>
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
    body: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15
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
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'flex-end'
    },
    list: {
        paddingLeft: 10
    },
    subText: {
        fontSize: 11,
        color: colors.black_70
    },
    title: {
        fontSize: 20,
        color: colors.dark_50,
        fontWeight: '700',
        borderBottomWidth: .5,
        borderBottomColor: colors.black_50,
        paddingVertical: 10
    }
})

export default AddCaller;
