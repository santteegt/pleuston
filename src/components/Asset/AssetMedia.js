import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Asset.scss'

class AssetMedia extends Component {
    static propTypes = {
        links: PropTypes.array,
        title: PropTypes.string
    }
    state = {
        imageUrl: ''
    }
    componentDidMount() {
        for (const link of this.props.links) {
            if (
                link.url &&
                link.type &&
                link.type === 'discovery' &&
                link.url.match(/\.(jpeg|jpg|gif|png)$/)
            ) {
                this.setState({ imageUrl: link.url })
                break
            }
        }
    }
    render() {
        return (
            <>
                {this.state.imageUrl !== '' && (
                    <img
                        alt={this.props.title}
                        className="asset__img"
                        src={this.state.imageUrl}
                    />
                )}
            </>
        )
    }
}

export default AssetMedia
