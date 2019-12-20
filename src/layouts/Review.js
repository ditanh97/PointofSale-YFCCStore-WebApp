// import Chart from 'chart.js';
import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import FileUpload from '../components/FileUpload'


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
            <h4>Testing for image upload</h4>
            <FileUpload />
        </div>
    )
}

export default Chart;