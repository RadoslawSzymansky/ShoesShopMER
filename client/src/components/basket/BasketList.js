import React from 'react';

const BasketList = ({ list }) => {
  console.log("lista", list)
  return (
    <>
      {list.map(product => <p>product.pro</p>)}
    </>  
  );
};

export default BasketList;