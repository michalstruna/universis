import * as React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Field, Form, } from '../../Forms'
import { addDiscussion } from '../../Universe'
import { UserInfo } from '../../User'

interface IProps {
    strings: Universis.Strings
    identity: Universis.Redux.AsyncEntity<Universis.User.Identity>
    addDiscussion: Universis.Consumer<Universis.Discussion.New>
    body: Universis.Redux.AsyncEntity<Universis.Universe.Body>
}

interface IValues {
    content: string
    title: string
}

/**
 * Form for login user.
 * There is only password input.
 */
class DiscussionForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static NAME = 'discussionForm'

    /**
     * Add answer.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { addDiscussion, reset, body } = this.props

        try {
            await addDiscussion({ ...data, bodyId: body.payload._id })
            reset()
        } catch (error) {
        }
    }

    public render(): React.ReactNode {
        const { strings, handleSubmit, invalid, submitting, identity } = this.props

        return (
            <section className='panel__body__discussion__post'>
                <UserInfo type={UserInfo.TYPES.SMALL} user={identity.payload} />
                <section className='panel__body__discussion__body'>
                    <Form
                        onSubmit={handleSubmit(this.handleSubmit)}
                        invalid={invalid}
                        sending={submitting}>
                        <section className='panel__body__discussion__metadata'>
                            <Field
                                label={strings.titleLabel}
                                required={strings.missingTitle}
                                name='title' />
                        </section>
                        <section className='panel__body__discussion__content'>
                            <Field
                                label={strings.discussionLabel}
                                required={strings.missingDiscussion}
                                name='content'
                                type={Field.TEXT_AREA} />
                            <Form.Submit />
                        </section>
                    </Form>
                </section>
            </section>
        )
    }

}

export default reduxForm({
    form: DiscussionForm.NAME
})(DiscussionForm.connect(
    ({ system, user, universe }: Universis.Redux.StoreState) => ({
        strings: system.strings.discussion,
        identity: user.identity,
        body: universe.body
    }),
    { addDiscussion }
))