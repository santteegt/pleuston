import React from 'react'
import ReactDOM from 'react-dom'
import Account from './Account'

it('Account renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Account
            name="hello"
            activeAccount={{
                getBalance: () => {
                    return {
                        'id': '0x903322c7e45a60d7c8c3ea236c5bea9af86310c7',
                        'balance': {
                            'eth': {
                                's': 1,
                                'e': 18,
                                'c': [
                                    29930,
                                    78907000000000
                                ]
                            },
                            'ocn': {
                                's': 1,
                                'e': 1,
                                'c': [
                                    33
                                ]
                            }
                        }
                    }
                }
            }}
            networkName={'Kovan'}
            initMakeItRain={() => null}
        />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
