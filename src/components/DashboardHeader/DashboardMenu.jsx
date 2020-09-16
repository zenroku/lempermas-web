import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { IconButton, ListItemAvatar, Avatar, Typography, Collapse, Drawer, List, Divider, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { auth } from '../../config/firebase'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { greeting } from '../../functions/dateconvert'
import { LoginContext } from '../../context/authContext'
import Advice from '../Advice and Report/Advice'
import Report from '../Advice and Report/Report'
import BaseWarning from '../Feedback/BaseWarning'

const useStyles = makeStyles(theme => ({
    list: {
        width: 265,
        height: '100vh',
        position: "relative"
    },
    fullList: {
        width: 'auto',
    },
    footer: {
        width: 265,
        position: 'absolute',
        bottom: 0
    },
    copyright: {
        padding: theme.spacing(2),
        fontSize: '0.65em'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    icon: {
        color: 'primary'
    }
}));

export default function DashboardMenu({ user, registered, posted }) {
    const classes = useStyles();
    const [state, setState] = useState({ left: false });
    const [openUser, setOpenUser] = useState(false)
    const { url } = useRouteMatch()
    const history = useHistory()
    const { setIsLogin } = useContext(LoginContext)
    const [openAdvice, setOpenAdvice] = useState(false)
    const [openReport, setOpenReport] = useState(false)
    const [openWarn, setOpenWarn] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const logoutAction = () => {
        setIsLogin(false)
        auth.signOut()
        history.push('/')
    }

    const addLink = () => {
        setOpenWarn(true)
        setErrMsg('untuk melakukan fitur ini anda perlu edit profil anda terlebih dahulu')
    }

    const editLink = () => {
        setOpenWarn(true)
        setErrMsg('untuk melakukan fitur ini anda harus mempunyai produk sendiri, silahkan tambah produk')
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}

        >
            <List>
                <ListItem button onClick={() => setOpenUser(!openUser)} >
                    <ListItemAvatar>
                        <Avatar src={user && user.photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={user && user.displayName ? (greeting()) : ('Anonymous')} secondary={user && user.displayName ? user.displayName : 'Klik Saya dan ubah profil'} />
                </ListItem>
                <Collapse in={openUser} timeout="auto" unmountOnExit>
                    <Link to={`${url}/updateProfile`} className={classes.link} >
                        <ListItem button onClick={toggleDrawer(anchor, false)}>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="Ubah Profil" />
                        </ListItem>
                    </Link>
                    <Link to={`${url}/updatePassword`} className={classes.link}>
                        <ListItem button onClick={toggleDrawer(anchor, false)}>
                            <ListItemIcon><LockOpenIcon /></ListItemIcon>
                            <ListItemText primary="Ubah Password" />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={logoutAction}>
                        <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </Collapse>
            </List>
            <Divider />

            <List>
                <Link to={registered ? `${url}/add` : `${url}/product`} onClick={() => !registered ? addLink() : null} className={classes.link}>
                    <ListItem button onClick={toggleDrawer(anchor, false)} >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText primary="Tambah Produk" />
                    </ListItem>
                </Link>
                <Link to={posted.length !== 0 ? `${url}/updateProduct` : `${url}/add`} onClick={() => posted.length === 0 ? editLink() : null} className={classes.link}>
                    <ListItem button onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon><EditIcon /></ListItemIcon>
                        <ListItemText primary="Ubah / Hapus Produk" />
                    </ListItem>
                </Link>
                <Link to={`${url}/product`} className={classes.link}>
                    <ListItem button onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                        <ListItemText primary="Daftar Produk" />
                    </ListItem>
                </Link>
                <Link to={`${url}/member`} className={classes.link}>
                    <ListItem button onClick={toggleDrawer(anchor, false)}>
                        <ListItemIcon><GroupIcon /></ListItemIcon>
                        <ListItemText primary="Daftar Member" />
                    </ListItem>
                </Link>
            </List>
            <div className={classes.footer}>
                <List>
                    <Link to='/menu' className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><RestaurantMenuIcon /></ListItemIcon>
                            <ListItemText primary="Kembali ke Menu" />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={() => setOpenAdvice(true)}>
                        <ListItemIcon><FeedbackIcon /></ListItemIcon>
                        <ListItemText primary="Beri Saran" />
                    </ListItem>
                    <ListItem button onClick={() => setOpenReport(true)}>
                        <ListItemIcon><ReportProblemIcon /></ListItemIcon>
                        <ListItemText primary="Lapor Kesalahan" />
                    </ListItem>
                </List>
                <Divider />
                <Typography align="center" className={classes.copyright} variant="body2" >Copyright © 2020 Lempermas.</Typography>
            </div>
        </div>
    );

    return (
        <>
            <IconButton onClick={toggleDrawer('left', true)} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={state.left} onClose={toggleDrawer('left', false)}>
                {list('left')}
                <Advice openModal={openAdvice} closeModal={(value) => setOpenAdvice(value)} />
                <Report openModal={openReport} user={user && user.email} closeModal={(value) => setOpenReport(value)} />
            </Drawer>
            <BaseWarning title="Error" message={errMsg} popWarning={openWarn} closeWarning={(val) => setOpenWarn(val)} />
        </>

    );
}
