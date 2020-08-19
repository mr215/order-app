import React, { ComponentProps, ReactElement } from 'react'
import { FieldProps, getIn } from 'formik'
import { 
    IonItem,
    IonLabel,
    IonCheckbox,
} from '@ionic/react'

import ErrorText from '../components/ErrorLabel'

interface CheckboxItem {
    label: ReactElement
    value: boolean
}

interface Props extends ComponentProps<typeof IonCheckbox> {
    label: string 
    labelProps: ComponentProps<typeof IonLabel>
    slot?: string
    item: CheckboxItem,
}

const FormikCheckbox: React.FC<FieldProps & Props> = ({
    field: { name, value },
    form,
    label,
    labelProps,
    slot = 'start',
    item,
    ...props
}) => {
    const error = getIn(form.errors, name)
    const touched = getIn(form.touched, name)

    return (
            <IonItem key={name}>
                <IonLabel>{label}</IonLabel>
                <IonCheckbox 
                    slot={slot}
                    value={value}
                    onIonBlur={e => form.setFieldTouched(name)}
                    onIonChange={e => form.setFieldValue(name, e.detail.checked!)}
                    {...props}
                />
                {error && touched && <ErrorText>{error}</ErrorText>}
            </IonItem>
        
    )
}

export default FormikCheckbox