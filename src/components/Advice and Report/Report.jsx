import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core'
import { db, storage } from '../../config/firebase'
import UploadButton from '../InputComponent/UploadButton'
import { v4 as uuid } from 'uuid';
import firebase from 'firebase'
import CircularLoop from '../Feedback/CircularLoop'
import BaseWarning from '../Feedback/BaseWarning'

export default function Report({ openModal, closeModal, user }) {
    const [report, setReport] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [errMsg, setErrMsg] = useState('')
    const [popWarn, setPopWarn] = useState(false)
    const [success, setSuccess] = useState(false)

    const submit = (event) => {
        event.preventDefault()
        if (image !== null) {
            const idImg = uuid()
            const uploadTask = storage.ref(`reports/${idImg}`).put(image)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                (error) => {
                    setPopWarn(true)
                    setErrMsg(error.message)
                },
                () => {
                    storage
                        .ref("reports")
                        .child(idImg)
                        .getDownloadURL()
                        .then(url => {
                            setSuccess(true)
                            db.collection('reports').add({
                                reporter: user,
                                report,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                imageId: idImg,
                                imageUrl: url
                            })
                                .then(() => {
                                    setSuccess(true)
                                    setPopWarn(true)
                                    setErrMsg('Laporan Terkirim')
                                })
                                .catch(err => {
                                    setPopWarn(true)
                                    setErrMsg(err.message)
                                })


                            setReport('')
                            setImage(null)
                            setProgress(0)
                        })
                }
            )

        }

        if (report === '') {
            setPopWarn(true)
            setErrMsg('Laporan tidak boleh kosong')
        }

        if (image === null && report !== '') {
            db.collection('reports').add({
                user,
                report,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then(() => {
                    setSuccess(true)
                    setPopWarn(true)
                    setErrMsg('Laporan Terkirim')
                    setReport('')
                })
        }
    }

    return (
        <div>
            <Dialog open={openModal} onClose={() => closeModal(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Lapor Error</DialogTitle>
                <form onSubmit={submit}>
                    <DialogContent>
                        <DialogContentText>
                            Kirim Laporan Anda disini
                    </DialogContentText>
                        <TextField
                            autoFocus
                            variant="outlined"
                            margin="dense"
                            id="name"
                            multiline
                            rows={5}
                            label="Tulis Laporan"
                            type="text"
                            fullWidth
                            value={report}
                            onChange={(event) => setReport(event.target.value)}
                        />
                        <Typography gutterBottom variant="caption">
                            Lampirkan bukti kesalahan/error dengan upload foto dibawah ini jika perlu
                        </Typography>
                        {progress !== 0 ? (
                            <CircularLoop
                                style={{
                                    justifyContent: "center",
                                    minWidth: 300,
                                    alignItems: 'center'
                                }}
                            />
                        ) : (
                                <UploadButton imageUploadCallback={(val => setImage(val))} />
                            )}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => closeModal(false)} color="primary">
                            Batal
                    </Button>
                        <Button type="submit" disabled={success} color="primary">
                            {progress ? <CircularLoop style={{ transform: 'scale(0.5)', marginTop: '-10px', marginBottom: '-10px' }} /> : (
                                success ? 'Terkirim' : 'Kirim'
                            )}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <BaseWarning title={success ? 'Berhasil' : 'Error'} message={errMsg} popWarning={popWarn} closeWarning={(val) => setPopWarn(val)} />
        </div>
    );
}
