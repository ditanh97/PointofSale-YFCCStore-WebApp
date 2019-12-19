import React from 'react';
import {Avatar, Paper, Tabs, Tab, Fab} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    // maxWidth: 500,
  },
}));

const CustomTabs = (props) => {
  //syntax: <Tab item={catData}/>
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const {item:  tabObject} = props

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="icon label tabs example"
      >
            {
            tabObject.map((tab, index)=>{
                return(
                <Tab key={index} icon={<Avatar alt={tab.name} src={tab.uri} />} label={tab.name}/>
            )})
            }
      </Tabs>
    </Paper>
    </div>
  );
}

export default CustomTabs