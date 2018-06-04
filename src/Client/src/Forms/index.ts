/**
 * Root file of FormModule.
 * Form Module is used for form components like Form, TextInput, Submit, etc.
 */
import Form, { IFormProps } from './Components/Form'
import FormActions from './Redux/FormActions'
import FormReducer from './Redux/FormReducer'
import EmailInput from './Components/EmailInput'
import PasswordInput from './Components/PasswordInput'
import Submit from './Components/Submit'
import TextInput from './Components/TextInput'
import Title from './Components/Title'
import { IFieldInputProps } from './Components/FieldInput'

export {

    Form,
    IFieldInputProps,
    TextInput,
    EmailInput,
    PasswordInput,
    Submit,
    Title,
    FormActions,
    FormReducer

}