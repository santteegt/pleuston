import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../atoms/Button'
import Spinner from '../../../atoms/Spinner'

import styles from './Picker.module.scss'

export default class CloudStoragePicker extends PureComponent {
    _isMounted = false
    static propTypes = {
        linkSetter: PropTypes.func.isRequired,
        handleCloseModal: PropTypes.func.isRequired,
        storageProvider: PropTypes.any.isRequired
    }

    state = {
        selection: [],
        loading: false,
        blobs: [],
        error: ''
    }

    async componentDidMount() {
        this._isMounted = true
        this.setState({ loading: true })
        const files = await this.props.storageProvider.loadFiles()
        if (this._isMounted) {
            this.setState({ blobs: files, loading: false })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
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

    async submitSelection() {
        const selectionWithData = []
        for (const e of this.state.selection) {
            selectionWithData.push(this.state.blobs[e])
        }
        const firstBlob = selectionWithData[0] // only first one from selected
        const link = await this.props.storageProvider.getSharableLink(firstBlob)
        this.props.linkSetter(link)
        this.props.handleCloseModal()
    }

    render() {
        return (
            <>
                <div className={styles.files}>
                    {
                        this.state.blobs === undefined || this.state.blobs.length === 0 ? (
                            <div className={styles.empty}>
                                {this.state.loading ? <Spinner />
                                    : this.state.error
                                        ? <span className={styles.error}>{this.state.error}</span>
                                        : <span>No files found</span>
                                }
                            </div>
                        ) : (
                            this.state.blobs.map((blob, index) => (
                                <span
                                    key={index}
                                    onClick={() => this.handleSelection(index)}
                                    className={this.state.selection.includes(index) ? styles.selected : styles.file}
                                >
                                    {this.props.storageProvider.getPresentableFile(blob)}
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
            </>
        )
    }
}
