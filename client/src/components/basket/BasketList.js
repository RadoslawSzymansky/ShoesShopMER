import React from 'react';
import BasketElement from './BasketElement';

const BasketList = ({ list }) => {
  return (
    <>
      {list.map(product => <BasketElement key={product.id} {...product}/>)}
    </>  
  );
};

export default BasketList;