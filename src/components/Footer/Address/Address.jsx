import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Address({ openModal, closeModal }) {

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => closeModal(false)}
                aria-labelledby="address-title"
                aria-describedby="address-description"
                fullWidth
            >
                <DialogTitle id="address-title">Alamat Kami</DialogTitle>
                <DialogContent >
                    <DialogContentText id="address-description">
                        Jl. Kamojang No.2<br />
                    RT.02 / RW.06<br />
                    Komplek Laladon Indah, Kecamatan Ciomas, Kabupaten Bogor<br />
                    Jawa Barat<br />
                    16610
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeModal(false)} color="primary" autoFocus>
                        Tutup
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
