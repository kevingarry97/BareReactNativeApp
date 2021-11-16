import React from 'react';
import {useFormikContext} from 'formik'

import AppButton from './../button';

function SubmitButton({title, width, color}) {
    const { handleSubmit } = useFormikContext()
    return (
        <AppButton width={width} color={color} title={title} onPress={handleSubmit} />
    );
}

export default SubmitButton;