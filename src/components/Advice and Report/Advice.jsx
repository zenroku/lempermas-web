import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core'
import { db } from '../../config/firebase'
import firebase from 'firebase'
import CircularLoop from '../Feedback/CircularLoop'
import BaseWarning from '../Feedback/BaseWarning';

export default function Advice({ openModal, closeModal }) {
    const [name, setName] = useState('')
    const [advice, setAdvice] = useState('')
    const [progress, setProgress] = useState(false)
    const [success, setSuccess] = useState(false)
    const [popWarn, setPopWarn] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const submit = (event) => {
        event.preventDefault()
        if (advice !== '') {
            setProgress(true)
            db.collection('advices').add({
                name: name === "" ? "Anonymous" : name,
                advice,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then(() => {
                    setName('')
                    setAdvice('')
                    setProgress(false)
                    setSuccess(true)
                })
                .catch((err) => {
                    setPopWarn(true)
                    setErrMsg(err.message)
                })
        }

        if (advice === '') {
            setPopWarn(true)
            setErrMsg('Saran tidak boleh kosong')
        }

    }

    return (
        <div>
            <Dialog open={openModal} onClose={() => closeModal(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Beri Saran untuk Website Kami</DialogTitle>
                <form onSubmit={submit}>
                    <DialogContent>
                        <DialogContentText>
                            Berikan kami masukan untuk website ini agar makin berkembang
                    </DialogContentText>

                        <TextField
                            autoFocus
                            variant="outlined"
                            margin="dense"
                            id="name"
                            label='Nama Anda'
                            placeholder="*jika berkenan"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="name"
                            multiline
                            // required
                            rows={5}
                            label="Saran Anda"
                            type="text"
                            fullWidth
                            value={advice}
                            onChange={(event) => setAdvice(event.target.value)}
                        />
                        <Typography variant="caption">
                            anda dapat menghubungi developer jika anda tertarik untuk membangun website dengan klik link <a style={{ color: 'inherit' }} target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=62982145868">whatsapp</a>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            closeModal(false)
                            setProgress(false)
                            setSuccess(false)
                            setName('')
                            setAdvice('')
                        }} disabled={progress} color="primary">
                            Batal
                    </Button>
                        <Button type="submit" disabled={success} color="primary">
                            {progress ? <CircularLoop style={{ transform: 'scale(0.5)', marginTop: '-10px', marginBottom: '-10px' }} /> : (
                                success ? 'Terkirim' : 'Kirim'
                            )}
                        </Button>
                    </DialogActions>
                </form>
                <BaseWarning
                    title="Error"
                    message={errMsg}
                    popWarning={popWarn}
                    closeWarning={val => setPopWarn(val)}
                    onClickAction={() => {
                        setAdvice('')
                        setName('')
                    }}
                />
            </Dialog>
        </div>
    );
}
