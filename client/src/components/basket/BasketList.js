import React from 'react';
import BasketElement from './BasketElement';

const BasketList = ({ list }) => {
  return (
    <div className="ui items" style={{display: 'flex', alignContent: 'center', flexWrap: 'wrap', padding: 20}}>
      {list.map((product, i) => <BasketElement key={product.id + 1} {...product}/>)}
    </div>  
  );
};

export default BasketList;

