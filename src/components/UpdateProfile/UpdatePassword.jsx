import React, { useState } from 'react'
import DashboardBanner from '../DashboardHeader/DashboardBanner'
import { Paper, Typography, TextField, Button, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { auth } from '../../config/firebase'

function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


    const changePass = (event) => {
        setErr(false)
        setErrMsg('')
        event.preventDefault()
        if (password !== password2) {
            setErr(true)
            setErrMsg('Password yang anda masukkan tidak cocok')
        } else {
            var user = auth.currentUser;
            user.updatePassword(password).then(function () {
                setSuccess(true)
                setPassword('')
                setPassword2('')
            }).catch(function (error) {
                console.log(error)
                if (error.code === 'auth/weak-password') {
                    setErrMsg('Password minimal 6 karakter')
                    setErr(true)
                }
                if (error.code === 'auth/requires-recent-login') {
                    setErrMsg('Anda telah logout karena beberapa kesalahan silahkan login kembali')
                    setErr(true)
                }
            });
        }

    }

    return (
        <div>
            <DashboardBanner />
            <Paper className="updateProfile">
                <div className="updateProfileContainer">
                    <Typography align="center" variant="body1">Pastikan konfirmasi password cocok</Typography>
                    <form onSubmit={changePass} className="updatePassword__form">
                        <TextField
                            id="password1"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            error={err}
                            label="Password Baru"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            tabIndex={-1}
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
                        <TextField
                            id="password2"
                            required
                            error={err}
                            helperText={errMsg}
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                            fullWidth label="Konfirmasi Password Baru"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                        />
                        <Button type="submit" disabled={success} style={{ maxWidth: 300, minWidth: 150 }} variant="contained" color="primary">{success ? 'Berhasil Ubah Password !' : 'Ubah Password'}</Button>
                    </form>
                </div>
            </Paper>
        </div>
    )
}

export default UpdatePassword
