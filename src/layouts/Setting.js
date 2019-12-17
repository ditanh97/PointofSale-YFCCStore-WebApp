import React from 'react'
import { makeStyles,  } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'yellow',
    },
}))

const Setting = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
             <div className={classes.toolbar} />
            SETTING LAYOUT
        </div>
    )
}


export default Setting;