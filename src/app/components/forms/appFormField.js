import React from 'react';
import { useFormikContext } from 'formik'

import AppTextInput from './../textInput';
import ErrorMessage from './errorMessage';

function AppFormField({ name, ...props}) {
    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext()
    return (
        <>
            <AppTextInput onBlur={() => setFieldTouched(name)} onChangeText={text => setFieldValue(name, text)} value={values[name]} {...props} />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormField;