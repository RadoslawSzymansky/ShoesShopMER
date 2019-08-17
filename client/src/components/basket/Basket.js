import React, {useEffect, useState } from 'react';
import BasketList from './BasketList';
import { Loader } from 'semantic-ui-react';

const Basket = props => {
  useEffect(() => {
      props.fetchBasket()
  }, [])

  const renderContent =() => {
    if(props.basket.length) {
      return (
        <>         
          <button className='ui primary button'>Kup wszystko</button>
          <BasketList list={props.basket} />
        </>
      )
    }
    if(!props.basket.length) {
      return <Loader/>
    }
  }
  return (
    <>
      {renderContent()}
    </>
  )
};

export default Basket;