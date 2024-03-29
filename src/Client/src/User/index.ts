/**
 * Components.
 */
import IdentityForm from './Components/IdentityForm'
import UserInfo from './Components/UserInfo'
import UsersList from './Components/UsersList'

export {
    IdentityForm,
    UserInfo,
    UsersList
}

/**
 * Redux.
 */
import UserReducer from './Redux/UserReducer'

export {
    UserReducer
}

export * from './Redux/UserActions'

/**
 * Views.
 */
import IdentityView from './Views/IdentityView'
import LoginView from './Views/LoginView'
import SignUpView from './Views/SignUpView'

export {
    IdentityView,
    LoginView,
    SignUpView
}

export { default as UserView } from './Views/UserView'
export { default as ResetPasswordView } from './Views/ResetPasswordView'
export { default as ResetPasswordForm } from './Components/ResetPasswordForm'
export { default as ActivateEmailView } from './Views/ActivateEmailView'