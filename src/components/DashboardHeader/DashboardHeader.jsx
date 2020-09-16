import React from 'react'
import './DashboardHeader.css'
import DashboardMenu from './DashboardMenu'
import { AppBar, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    gridContainer: {
        margin: theme.spacing(0.7)
    },
    menuButton: {
        color: theme.palette.primary.contrastText
    },
    logoDashboard: {
        display: 'flex',
        alignItems: 'center',
    }
}))

function DashboardHeader({ user, registered, posted }) {
    const classes = useStyles()

    return (
        <AppBar position="fixed" color="primary">
            <Grid container className={classes.gridContainer}>
                <Grid item md={4} xs={1}>
                    <DashboardMenu user={user} registered={registered} posted={posted} />
                </Grid>
                <Grid className={classes.logoDashboard} item md={8} xs={11}>
                    <h4 className="dashboardHeader__logo">Lempermas</h4>
                    <Typography variant="h5">Member Dashboard</Typography>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default DashboardHeader
