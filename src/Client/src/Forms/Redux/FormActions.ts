import ACTION_TYPES from './ActionTypes'

/**
 * Actions for forms.
 */
class FormActions {

    /**
     * Save value of input.
     * @param form Name of form.
     * @param input Name of input.
     * @param value Value of input.
     */
    public static setInput = (form: string, input: string, value: any) => ({
        type: ACTION_TYPES.SET_INPUT,
        form,
        input,
        value
    })

    /**
     * Form was sended.
     * @param form Name of form.
     */
    public static send = (form: string) => ({
        type: ACTION_TYPES.SEND_FORM,
        form
    })

    /**
     * Form was sended successfull.
     * @param form Name of form.
     */
    public static success = (form: string) => ({
        type: ACTION_TYPES.SUCCESS_FORM,
        form
    })

    /**
     * Form wasn't sended successfull.
     * @param form  Name of form.
     * @param error Error message.
     */
    public static fail = (form: string, error: string) => ({
        type: ACTION_TYPES.FAIL_FORM,
        form,
        error
    })

}

export default FormActions