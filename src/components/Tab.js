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
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
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

export default CustomTabs;

const CustomIcon = (props) => {
    const {name, image} = props
    return(
        <Fab color="primary" aria-label="add">
            <Avatar alt={name} src={image} />
            {name}
        </Fab>
    )
}

const TabPagination = ({tabsPerView, totalTabs, paginate}) => {
    const pageNumbers = []; 
    for (let i = 1; i <= Math.ceil(totalTabs / tabsPerView); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={()=> paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}