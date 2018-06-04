import ACTION_TYPES from './ActionTypes'

const initialState = {

}

export default function (state: any = initialState, action: any) {
    switch (action.type) {
        case ACTION_TYPES.SET_INPUT:
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    [action.input]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                }
            }

        case ACTION_TYPES.SEND_FORM: {
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    send: true
                }
            }
        }

        case ACTION_TYPES.SUCCESS_FORM: {
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    send: false,
                    error: null
                }
            }
        }

        case ACTION_TYPES.FAIL_FORM: {
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    send: false,
                    error: action.error
                }
            }
        }

        default:
            return state
    }
}