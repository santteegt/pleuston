import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../atoms/Button'

import styles from './CloudStoragePicker.module.scss'

export default class CloudStoragePicker extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            selection: []
        }
    }

    handleSelection(blobId) {
        if (this.state.selection.includes(blobId)) {
            this.setState({ selection: this.state.selection.filter(bId => bId !== blobId) })
        } else {
            this.setState(prevState => ({
                selection: [...prevState.selection, blobId]
            }))
        }
    }

    submitSelection() {
        const selectionWithData = []
        for (const e of this.state.selection) {
            selectionWithData.push(this.props.blobs[e])
        }
        this.props.urlGetter(selectionWithData)
    }

    render() {
        const { blobs } = this.props
        return (
            <div>
                <div className={styles.files}>
                    {
                        blobs === undefined || blobs.length === 0 ? (
                            <div className={styles.empty}>
                                <span>No files found</span>
                            </div>
                        ) : (
                            blobs.map(blob => (
                                <span
                                    key={blob.id}
                                    onClick={() => this.handleSelection(blob.id)}
                                    className={this.state.selection.includes(blob.id) ? styles.selected : styles.file}
                                >
                                    {blob.container}/{blob.blobName}
                                </span>
                            ))
                        )
                    }
                </div>
                <div className={styles.listSubmit}>
                    <Button
                        primary="true"
                        type="submit"
                        onClick={() => this.submitSelection()}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}

CloudStoragePicker.propTypes = {
    urlGetter: PropTypes.func.isRequired,
    blobs: PropTypes.array.isRequired
}
