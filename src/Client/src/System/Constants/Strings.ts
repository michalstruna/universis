import { Urls } from '../../Utils'

export default {

    home: {
        title: 'Universis',
        menu: {
            universe: 'Do vesmíru',
            login: 'Přihlášení'
        }
    },

    controls: {
        maximize: 'Maximalizovat',
        minimize: 'Minimalizovat',
        home: 'Domů',
        help: 'Nápověda',
        logIn: 'Přihlášení',
        logout: 'Odhlásit se',
        hideUI: 'Skrýt ovládání',
        showUI: 'Zobrazit ovládání',
        about: 'O Universis',
        viewSize: {
            0: 'Tly',
            [27.98 - 24.98]: 'Gly',
            [27.98 - 21.98]: 'Mly',
            [27.98 - 18.98]: 'kly',
            [27.98 - 15.98]: 'ly',
            [27.98 - 11.17]: 'AU',
            [27.98 - 3]: 'km',
            27.98: 'm'
        }
    },

    alert: {
        about: {
            title: 'O Universis',
            content: 'Universis je 3D simulátor vesmíru. Autorem je Michal Struna. Další informace naleznete v nápovědě.',
            buttons: [
                { label: 'Do vesmíru', target: Urls.UNIVERSE },
                { label: 'Nápověda', target: Urls.HELP }
            ]
        }
    },

    identity: {
        title: 'Přihlašte se.',
        email: 'Zadejte email',
        missingEmail: 'Zadejte email.',
        invalidEmail: 'Zadejte platný email.',
        submit: 'Další'
    },

    login: {
        title: 'Vítejte.',
        password: 'Zadejte heslo',
        missingPassword: 'Zadejte heslo.',
        invalidPassword: 'Zadejte správné heslo.',
        submit: 'Hotovo',
        forgotPassword: 'Zapomenuté heslo?',
        back: 'Zpět'
    },

    signUp: {
        title: 'Registrujte se.',
        password: 'Nové heslo',
        missingPassword: 'Zadejte nové heslo.',
        invalidPassword: 'Heslo musí mít 6+ znaků.',
        passwordAgain: 'Heslo znovu',
        missingPasswordAgain: 'Zadejte heslo znovu.',
        invalidPasswordAgain: 'Hesla se neshodují.',
        button: 'Registrovat se'
    },

    universe: {
        controls: {
            name: 'Jméno',
            size: 'Size',
            orbits: 'Orbity',
            labels: 'Popisky',
            panel: 'Panel',
            free: 'Uvolnit',
            now: 'Teď',
            move: 'Pohyb'
        }
    }

}