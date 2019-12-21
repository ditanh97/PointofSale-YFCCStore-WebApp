import React, { useEffect, useState } from 'react';
import {Grid, GridList, GridListTile, GridListTileBar,
IconButton, Tabs, Tab, Paper} from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { makeStyles  } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import {addCart} from '../services/redux/actions'
import ProductCard from './Card'


const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'yellow',
    },
    cardContent: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
    gridList: {
      width: '100%',
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
  },
  catalog:{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'red',
    width: "70%",
},
}))

export const Pagination = ({cardsPerPage, totalCards, paginate, currentPage}) => {
    const pageNumbers = []; 
    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }
    const [page, setCurrentPage] = useState(0)


    const handleChange =   (e, newPage) => {
        setCurrentPage(newPage)  
    }

    useEffect (()=> paginate(page+1),[page])
    
    return (
        <Paper square>
        <Tabs
        value={page}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="icon label tabs example"
      >
            {
            pageNumbers.map((number, index)=>{
                return(
                <Tab key={index} label={number}/>
            )})
            }
      </Tabs>
      </Paper>
    )
}


const ContentSample = (props) => {
// syntax : <ContentSample data={data} />
  const classes = useStyles();
  const [cards, setCards] = useState(props.data); 
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [cardsPerPage, setCardsPerPage] = useState(4); 

  useEffect(()=>{
        if (!cards) setLoading(true);
        setCards(props.data);
        setLoading(false);  
  }, [props.data]) 

  const indexOfLastCards = currentPage * cardsPerPage;
  const indexOfFirstCards = indexOfLastCards - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCards, indexOfLastCards)

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <Grid>
          <Pagination 
              cardsPerPage={cardsPerPage} 
              totalCards={cards.length} 
              paginate={paginate}
              currentPage={currentPage}/>
          <ProductCard products={currentCards} page={currentPage} loading={loading}/>
      </Grid>
          
  );
}


export default ContentSample;

