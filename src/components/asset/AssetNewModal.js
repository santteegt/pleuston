import React from 'react'
import Modal from '../atoms/Modal'
import styles from './AssetNewModal.module.scss'
import CloudStorageLoader from '../../containers/CloudStorageLoader'

const AssetNewModal = ({ ...props }) => (
    <Modal
        {...props}
        contentLabel="Select one or more files for publishing"
        title="Pick a data set"
    >
        <div className={styles.content}>

            <CloudStorageLoader
                handleCloseModal={props.handleCloseModal}
                linkSetter={props.linkSetter}
            />

        </div>
    </Modal>
)

export default AssetNewModal
