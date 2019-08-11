import React, {useEffect, useState } from 'react';
import BasketList from './BasketList';

const Basket = props => {
  console.log(props)
  useEffect(() => {
    console.log('pierwszy mount', props)
      props.fetchBasket()
  }, [])

  return (
    <>
      {props.basket.length ? <BasketList list={props.basket} /> : 'Brak produktów w koszyku' }
    </>
  )
};

export default Basket;