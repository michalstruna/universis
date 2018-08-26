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