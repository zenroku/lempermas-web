import React, { useState, useContext, useEffect } from 'react'
import './LoginForm.css'
import { Link as MuiLink, Paper, Divider, Typography, TextField, InputAdornment, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../config/firebase'
import CirculaProgress from '../Feedback/CircularLoop'
import { LoginContext } from '../../context/authContext'

const useStyles = makeStyles(theme => ({
    formArea: {
        width: 400,
        height: 'max-content'
    },
    loginText: {
        padding: theme.spacing(3),
        textAlign: 'center',
        fontWeight: 500,
        marginBottom: theme.spacing(3)
    },
    formLogin: {
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto'
    },
    formField: {
        marginBottom: theme.spacing(3),
    },
    navigationLink: {
        display: 'flex',
        margin: theme.spacing(2),
        marginLeft: 35,
        marginRight: 35,
        justifyContent: 'space-around',
        height: 'max-content'
    },
    singleLink: {
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '0.8em',
        fontFamily: 'var(--main-font)',
        color: 'var(--dark-green)',
        padding: theme.spacing(1),
        textAlign: 'center',
        border: '1px solid var(--dark-green)',
        borderRadius: 5
    },
    copyright: {
        textAlign: 'center',
        padding: theme.spacing(2),
        fontSize: '0.65em'
    },
    forgotP: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
}))

function LoginForm({ forgotCallback }) {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState({ password: false, email: false })
    const [showErrMsg, setShowErrMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const history = useHistory()
    const classes = useStyles()
    const { setIsLogin } = useContext(LoginContext)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        });
        return () => {
            unsubscribe()
        }
    }, [setIsLogin])

    const login = (event) => {
        event.preventDefault()
        setShowError({ password: false, email: false })
        setShowErrMsg()
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setIsLogin(true)
                setLoading(false)
                setSuccess(true)
                history.push('/dashboard/product')
            })
            .catch(err => {
                setLoading(false)
                switch (err.code) {
                    default: {
                        setShowErrMsg({ email: 'Login Gagal, cobalah beberapa saat lagi' })
                        setShowError({ email: true })
                        break;
                    }
                    case 'auth/wrong-password': {
                        setShowErrMsg({ password: 'Password anda salah' })
                        setShowError({ password: true })
                        break;
                    }
                    case 'auth/invalid-email': {
                        setShowErrMsg({ email: 'Masukkan email dengan benar' })
                        setShowError({ email: true })
                        break;
                    }
                    case 'auth/user-not-found': {
                        setShowErrMsg({ email: 'Akun tidak ditemukan' })
                        setShowError({ email: true })
                        break;
                    }
                }
            })
    }

    return (
        <Paper className={classes.formArea} >
            <h4 className="loginForm__logo">Lempermas</h4>
            <Divider variant="middle" />
            <form onSubmit={login} className={classes.formLogin}>
                <Typography variant="h5" className={classes.loginText}>Login</Typography>
                <Typography variant="subtitle2" className={classes.formField}>Khusus Mitra</Typography>
                <TextField autoFocus className={classes.formField} value={email} onChange={(e) => setEmail(e.target.value)} fullWidth id="email-field" variant="outlined" label="Email" size="small"
                    error={showError.email} helperText={showError.email ? showErrMsg.email : ''} type="email" />
                <TextField
                    className={classes.formField}
                    variant="outlined"
                    label="Password"
                    size="small"
                    id="password-field"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={showError.password}
                    helperText={showError.password ? showErrMsg.password : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={(event) => event.preventDefault()}
                                    edge="end"
                                    color="primary"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {loading ? (<CirculaProgress style={{ justifyContent: "center", alignItems: 'center', minHeight: 60 }} />) : (
                    <Button className={classes.formField} disabled={success} type="submit" variant="contained" color="primary">{success ? 'Berhasil Masuk !' : 'Masuk'}</Button>
                )}
            </form>
            <div className={classes.forgotP} >
                <Typography className={classes.formField} style={{ marginRight: 5 }} variant="body2">Lupa password ? </Typography>
                <MuiLink
                    onClick={() => forgotCallback(true)}
                    className={classes.formField}
                    component="button" variant="body2"
                    style={{ fontWeight: 'bold' }} >
                    kirim verifikasi email
                    </MuiLink>
            </div>
            <Divider variant="middle" />
            <ul className={classes.navigationLink}>
                <Link className={classes.singleLink} to="/">Kembali ke Home</Link>
                <Link className={classes.singleLink} to="/menu">Kembali ke Menu</Link>
            </ul>
            <Divider variant="middle" />
            <Typography variant="body2" className={classes.copyright}>Copyright © 2020 Lempermas.</Typography>
        </Paper>
    )
}

export default LoginForm
