import React, { useState, useEffect } from 'react'
import './DashboardHeader.css'
import { Paper, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import GroupIcon from '@material-ui/icons/Group';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    paper: {
        marginBottom: theme.spacing(3),
        display: 'flex',
    },
    icon: {
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: '1.7em',
        background: '#E0F2F1',
        borderRadius: '50px'
    },
    label: {
        padding: theme.spacing(1),
        fontWeight: '500',
    },
    wrapper: {
        margin: theme.spacing(1),
        alignItems: 'center'
    }
}))

function DashboardBanner() {
    const currentRoute = useHistory()
    const [injectData, setInjectData] = useState({ name: '', Icon: '' })

    useEffect(() => {
        switch (currentRoute.location.pathname) {
            default: {
                break
            }
            case '/dashboard/add': {
                setInjectData({
                    name: 'Tambah Data',
                    Icon: 'AddIcon'
                })
                break;
            }
            case '/dashboard/updateProduct': {
                setInjectData({
                    name: 'Ubah / Hapus Produk',
                    Icon: 'EditIcon'
                })
                break;
            }
            case '/dashboard/updateProfile': {
                setInjectData({
                    name: 'Ubah Profil',
                    Icon: 'AccountCircleIcon'
                })
                break;
            }
            case '/dashboard/updatePassword': {
                setInjectData({
                    name: 'Ubah Password',
                    Icon: 'LockOpenIcon'
                })
                break;
            }
            case '/dashboard/product': {
                setInjectData({
                    name: 'Daftar Produk',
                    Icon: 'FormatListBulletedIcon'
                })
                break;
            }
            case '/dashboard/member': {
                setInjectData({
                    name: 'Daftar Member',
                    Icon: 'GroupIcon'
                })
                break;
            }
        }
    }, [currentRoute.location.pathname])

    const fillIcon = (params) => {
        switch (params.Icon) {
            case 'AddIcon': {
                return <AddIcon className={classes.icon} />
            }
            case 'EditIcon': {
                return <EditIcon className={classes.icon} />
            }
            case 'AccountCircleIcon': {
                return <AccountCircleIcon className={classes.icon} />
            }
            case 'LockOpenIcon': {
                return <LockOpenIcon className={classes.icon} />
            }
            case 'FormatListBulletedIcon': {
                return <FormatListBulletedIcon className={classes.icon} />
            }
            case 'GroupIcon': {
                return <GroupIcon className={classes.icon} />
            }
            default: {
                break
            }
        }
    }


    const classes = useStyles()
    return (
        <Paper className={classes.paper} >
            <Grid container className={classes.wrapper}>
                <Grid item>
                    {fillIcon(injectData)}
                </Grid>
                <Grid item>
                    <Typography className={classes.label} variant="h5">{injectData.name}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DashboardBanner
