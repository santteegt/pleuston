import React from 'react'
import Modal from '../../../atoms/Modal'
import styles from './Modal.module.scss'
import CloudStoragePickerLoader from '../../../../containers/CloudStoragePickerLoader'

const CloudStorageModal = ({ ...props }) => (
    <Modal
        {...props}
        contentLabel="Select one or more files for publishing"
        title="Pick a data set"
    >
        <div className={styles.content}>

            <CloudStoragePickerLoader
                handleCloseModal={props.handleCloseModal}
            />

        </div>
    </Modal>
)

export default CloudStorageModal
