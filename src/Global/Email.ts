declare namespace Universis.Email {

    /**
     * Interface for EmailModel.
     */
    export interface Model {

        /**
         * Send plain text email.
         * @param to Receiver. May be more receivers separated by comma.
         * @param subject Subject of email. There is also auto-prefix from email config.
         * @param content Plaint text email content.
         */
        sendText(to: string, subject: string, content: string): Promise<any>

        /**
         * Send HTML email.
         * @param to Receiver. May be more receivers separated by comma.
         * @param subject Subject of email. There is also auto-prefix from email config.
         * @param content HTML email content.
         */
        sendHtml(to: string, subject: string, content: string): Promise<any>

    }

}