import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Popover, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { auth } from '../../../config/firebase'
import { LoginContext } from '../../../context/authContext'

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 120,
        height: 80
    }
}));

function MemberButton({ node, close }) {
    const classes = useStyles();
    const { push } = useHistory();
    const { setIsLogin } = useContext(LoginContext)

    const handleClose = () => {
        close(null);
    };

    const open = Boolean(node);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={node}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.buttonContainer}>
                    <Button onClick={() => {
                        push('/dashboard/product')
                        handleClose()
                    }}>Dashboard</Button>
                    <Button onClick={() => {
                        handleClose()
                        auth.signOut()
                        setIsLogin(false)
                    }}>Logout</Button>
                </div>
            </Popover>
        </>
    )
}

export default MemberButton
