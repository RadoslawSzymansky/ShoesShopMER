import React from 'react';


const SizeBox = ({sizes, chooseSize, active}) => (
  <div className="sizeBox">
    {sizes.map(size => (
      <div onClick={chooseSize.bind(null, size)} key={size}  className={`size ${active === size ? 'active' : null}`}>{size}</div>
    ))}
  </div>
);

export default SizeBox;