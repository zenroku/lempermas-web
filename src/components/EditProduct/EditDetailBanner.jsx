import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';

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


function EditDetailBanner() {
    const classes = useStyles()
    return (
        <Paper className={classes.paper} >
            <Grid container className={classes.wrapper}>
                <Grid item>
                    <EditIcon className={classes.icon} />
                </Grid>
                <Grid item>
                    <Typography className={classes.label} variant="h5">Ubah Produk</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default EditDetailBanner
