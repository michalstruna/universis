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
        hideUI: 'Skrýt ovládání',
        showUI: 'Zobrazit ovládání',
        about: 'O Universis',
        zoomSlider: {
            0: 'Tly',
            [26.98 - 23.98]: 'Gly',
            [26.98 - 20.98]: 'Mly',
            [26.98 - 17.98]: 'kly',
            [26.98 - 14.98]: 'ly',
            [26.98 - 11.17]: 'AU',
            [26.98 - 3]: 'km',
            26.98: 'm'
        }
    },

    alert: {
        about: {
            title: 'O Universis',
            content: 'Universis je 3D simulátor vesmíru. Autorem je Michal Struna. Další informace jsou v nápovědě.',
            buttons: [
                { label: 'Do vesmíru', target: Urls.UNIVERSE },
                { label: 'Nápověda', target: Urls.HELP }
            ]
        }
    },

    identity: {
        title: 'Přihlašte se.',
        email: 'Váš email',
        button: 'Další'
    },

    login: {
        title: 'Přihlašte se.',
        password: 'Vaše heslo',
        button: 'Hotovo',
        forgot: 'Zapomenuté heslo?'
    },

    signUp: {
        title: 'Registrujte se.',
        password: 'Nové heslo',
        passwordAgain: 'Heslo znovu',
        button: 'Hotovo'
    }

}