import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        selectedBody: null,
        areLabelsVisible: true,
        isLightVisible: false,
        areOrbitsVisible: true,
        bodies: Redux.EMPTY_ASYNC_ENTITY,
        body: Redux.EMPTY_ASYNC_ENTITY,
        events: Redux.EMPTY_ASYNC_ENTITY,

        posts: {
            payload: [
                {
                    _id: '1',
                    title: 'Jaké jsou podmínky pro vznik života?',
                    user: {
                        avatar: 'https://i.pinimg.com/originals/3d/af/bb/3dafbbca852add94c6b2af6e4c01881d.jpg',
                        name: 'Michal',
                        score: {
                            gold: 12,
                            silver: 1329,
                            bronze: 12347,
                            karma: 15
                        }
                    },
                    content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Praesent in mauris eu tortor porttitor accumsan. Etiam dictum tincidunt diam. In enim a arcu imperdiet malesuada.',
                    agreements: ['c', 'b'],
                    disagreements: ['a'],
                    date: '2019-02-07T15:36:24',
                    answers: [
                        {
                            _id: '6',
                            user: {
                                avatar: 'https://i.pinimg.com/originals/3d/af/bb/3dafbbca852add94c6b2af6e4c01881d.jpg',
                                name: 'Michal',
                                score: {
                                    gold: 12,
                                    silver: 1329,
                                    bronze: 12347,
                                    karma: 15
                                }
                            },
                            content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
                            agreements: ['a', 'b'],
                            disagreements: ['c'],
                            date: '2019-02-07T15:36:24',
                            answers: []
                        },
                        {
                            _id: '5',
                            user: {
                                avatar: 'https://i.pinimg.com/originals/3d/af/bb/3dafbbca852add94c6b2af6e4c01881d.jpg',
                                name: 'Michal',
                                score: {
                                    gold: 12,
                                    silver: 1329,
                                    bronze: 12347,
                                    karma: 15
                                }
                            },
                            content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
                            agreements: ['a', 'b'],
                            disagreements: ['c'],
                            date: '2019-02-07T15:36:24',
                            answers: []
                        }
                    ]
                },
                {
                    _id: '2',
                    title: 'Cygne-chan, nešprtej se pořád',
                    user: {
                        avatar: 'https://i.pinimg.com/originals/3d/af/bb/3dafbbca852add94c6b2af6e4c01881d.jpg',
                        name: 'Michal',
                        score: {
                            gold: 12,
                            silver: 1329,
                            bronze: 12347,
                            karma: 15
                        }
                    },
                    content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
                    agreements: [],
                    disagreements: [],
                    date: '2019-02-07T15:36:24',
                    answers: []
                },
                {
                    _id: '7',
                    title: 'Jaké jsou podmínky pro vznik života?',
                    user: {
                        avatar: 'https://i.pinimg.com/originals/3d/af/bb/3dafbbca852add94c6b2af6e4c01881d.jpg',
                        name: 'Michal',
                        score: {
                            gold: 12,
                            silver: 1329,
                            bronze: 12347,
                            karma: 15
                        }
                    },
                    content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Praesent in mauris eu tortor porttitor accumsan. Etiam dictum tincidunt diam. In enim a arcu imperdiet malesuada.',
                    agreements: ['c', 'b'],
                    disagreements: ['a'],
                    date: '2019-02-07T15:36:24',
                    answers: [
                        {
                            _id: '3',
                            user: {
                                avatar: 'https://i.pinimg.com/originals/3d/af/bb/3dafbbca852add94c6b2af6e4c01881d.jpg',
                                name: 'Michal',
                                score: {
                                    gold: 12,
                                    silver: 1329,
                                    bronze: 12347,
                                    karma: 15
                                }
                            },
                            content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
                            agreements: ['a', 'b'],
                            disagreements: ['c'],
                            date: '2019-02-07T15:36:24',
                            answers: []
                        },
                        {
                            _id: '4',
                            user: {
                                avatar: 'https://i.pinimg.com/originals/3d/af/bb/3dafbbca852add94c6b2af6e4c01881d.jpg',
                                name: 'Michal',
                                score: {
                                    gold: 12,
                                    silver: 1329,
                                    bronze: 12347,
                                    karma: 15
                                }
                            },
                            content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
                            agreements: ['a', 'b'],
                            disagreements: ['c'],
                            date: '2019-02-07T15:36:24',
                            answers: []
                        }
                    ]
                }
            ]
        }
    }
)