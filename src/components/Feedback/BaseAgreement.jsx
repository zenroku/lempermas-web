import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function BaseAgreement({ agreement, setAgreement }) {

    return (
        <div>
            <Dialog
                open={agreement.isOpen}
                onClose={() => setAgreement({ ...agreement, isOpen: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{agreement.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {agreement.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setAgreement({ ...agreement, isOpen: false })}>
                        Batal
                    </Button>
                    <Button color="primary" autoFocus onClick={agreement.onConfirm}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

