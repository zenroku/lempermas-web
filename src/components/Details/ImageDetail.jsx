import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        outline: 'none',

    },
    imageSize: {
        maxWidth: 800,
        maxHeight: 600,
        objectFit: 'contain',
        '@media (max-width:600px)': {
            maxWidth: 400,
            maxHeight: 600,
        }
    }
}));

export default function ImageDetail({ openModal, closeModal, detailImg }) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                style={{ outline: 'none' }}
                aria-labelledby="image-detail-title"
                aria-describedby="image-detail-description"
                className={classes.modal}
                open={openModal}
                onClose={() => closeModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={classes.imageContainer}>
                        <img src={detailImg}
                            className={classes.imageSize}
                            alt="" />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


