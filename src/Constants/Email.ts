import Config from './Config'

export default {

    resetPassword: {
        subject: () => `Obnovení hesla`,
        content: (token: string) => `Kliknutím na následující odkaz můžete nastavit nové heslo: ${Config.domain}/reset-password?token=${token}. Odkaz má platnost 30 minut, poté již nebude funkční.`
    }

}