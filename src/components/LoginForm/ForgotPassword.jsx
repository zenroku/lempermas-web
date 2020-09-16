import React, { useState } from 'react'
import { Paper, Typography, Divider, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { auth } from '../../config/firebase'
import CirculaProgress from '../Feedback/CircularLoop'

const useStyles = makeStyles((theme) => ({
    paper: {
        height: '60vh',
        width: '60vh',
    },
    forgotPaswordTitle: {
        padding: theme.spacing(3),
        textAlign: 'center',
        fontWeight: 500,
    },
    formForgot: {
        width: '46vh',
        margin: 'auto',
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",

    },
    inputForm: {
        marginTop: theme.spacing(3)
    },
    button: {
        minWidth: 120,
        maxWidth: 200,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
}))

function ForgotPassword({ closeForgot }) {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showErrMsg, setShowErrMsg] = useState('')
    const [showError, setShowError] = useState(false)

    const sendPasword = (event) => {
        event.preventDefault()
        setShowErrMsg('')
        setShowError(false)
        setLoading(true)
        auth.sendPasswordResetEmail(email).then(function () {
            setSent(true)
            setLoading(false)
        }).catch(function (error) {
            setShowError(true)
            setLoading(false)
            switch (error.code) {
                case 'auth/invalid-email':
                    setShowErrMsg('Masukkan email dengan benar')
                    break;
                case 'auth/user-not-found':
                    setShowErrMsg('Akun tidak ditemukan')
                    break;
                default:
                    setShowErrMsg('Gagal, cobalah beberapa saat lagi')
                    break;
            }
        });
    }

    return (
        <Paper className={classes.paper}>
            <Typography align="center" variant="h5" className={classes.forgotPaswordTitle}>Lupa Password</Typography>
            <Divider variant="middle" />
            <Typography align="center" style={{ marginTop: 15 }} variant="subtitle1">Masukkan Email Akun Anda</Typography>

            <form onSubmit={sendPasword} className={classes.formForgot}>
                <Typography align="center" style={{ marginTop: 15 }} variant="caption">Anda akan mendapatkan email verifikasi untuk merubah password anda</Typography>
                <TextField
                    className={classes.inputForm}
                    value={email}
                    fullWidth
                    type="email"
                    error={showError}
                    helperText={showErrMsg}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email-field"
                    variant="outlined"
                    label="Email" size="small"
                />
                {loading ? (<CirculaProgress style={{ justifyContent: "center", alignItems: 'center', minHeight: 60 }} />) : (
                    <Button type="submit" variant="contained" disabled={sent} className={classes.button} color="primary">{sent ? 'Verifikasi Terkirim ✔' : 'Kirim Verifikasi'} </Button>
                )}

            </form>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 50, marginTop: 5 }}>
                <Button variant="outlined" onClick={() => closeForgot(false)}>Keluar</Button>
            </div>
        </Paper>
    )
}

export default ForgotPassword
