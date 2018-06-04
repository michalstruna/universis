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
        about: 'O Universis'
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
    }

}