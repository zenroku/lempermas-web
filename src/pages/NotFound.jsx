import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

function NotFound() {
    const history = useHistory()
    return (
        <div style={{ margin: 'auto', height: '30vh', width: '50vw', marginTop: '25vh', display: 'flex', flexDirection: 'column' }}>
            <Typography align="center" variant="h3">Halaman Tidak Ditemukan</Typography>
            <Button style={{ margin: 'auto' }} variant="outlined" onClick={() => history.goBack()}>Kembali</Button>
        </div >
    )
}

export default NotFound
