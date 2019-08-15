import React from 'react';
import BasketElement from './BasketElement';

const BasketList = ({ list }) => {
  return (
    <div className="ui items">
      {list.map(product => <BasketElement key={product.id} {...product}/>)}
    </div>  
  );
};

export default BasketList;

