import React, { useEffect, useState } from 'react';
import {Grid, TextField,
Tabs, Tab, Paper} from '@material-ui/core';
import { ImageSearch } from '@material-ui/icons';
import ProductCard from './Card'


export const Pagination = ({cardsPerPage, totalCards, paginate, currentPage}) => {
    const pageNumbers = []; 
    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }
    const [page, setCurrentPage] = useState(0)


    const handleChange =   (e, newPage) => {
        setCurrentPage(newPage)  
    }

    useEffect (()=>{
        setCurrentPage(0)
        console.log("seharusnya sebelum return")}, [])
    useEffect (()=> paginate(page+1),[page])
    useEffect (()=> {
        console.log(pageNumbers, page, 'hahaha')
        console.log(currentPage, 'useEffect totalcard')
    },[totalCards])
    
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
                console.log("render di return", page)
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
  const [cards, setCards] = useState(props.data); 
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [cardsPerPage, setCardsPerPage] = useState(4); 

  useEffect(()=>{
        if (!cards) setLoading(true);
        setCards(props.data);
        setLoading(false);  
        setCurrentPage(1);
  }, [props.data]) 

  const indexOfLastCards = currentPage * cardsPerPage;
  const indexOfFirstCards = indexOfLastCards - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCards, indexOfLastCards)

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <Grid>
            {Array.isArray(cards) && cards.length>0 ?
            <Grid>
                <Pagination 
                cardsPerPage={cardsPerPage} 
                totalCards={cards.length} 
                paginate={paginate}
                currentPage={currentPage}/>
                <ProductCard products={currentCards} page={currentPage} loading={loading}/>
            </Grid> :
            <Paper square><Grid container justify="center">
                <ImageSearch/>&nbsp;
                No Product Found in This Category &emsp;
            </Grid></Paper>}
    </Grid>
  );
}


export default ContentSample;

