// import Chart from 'chart.js';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'yellow',
    },
}))

const Chart = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
             <div className={classes.toolbar} />
            CHART LAYOUT
        </div>
    )
}

export default Chart;