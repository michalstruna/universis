/**
 * Root file of FormModule.
 * Form Module is used for form components like Form, TextField, Submit, etc.
 */
import Form from './Components/Form'
import FormActions from './Redux/FormActions'
import FormReducer from './Redux/FormReducer'
import EmailInput from './Components/EmailField'
import PasswordField from './Components/PasswordField'
import Submit from './Components/Submit'
import TextField from './Components/TextField'
import Title from './Components/Title'

export {

    Form,
    TextField,
    EmailInput,
    PasswordField,
    Submit,
    Title,
    FormActions,
    FormReducer

}