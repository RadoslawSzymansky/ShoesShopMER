import React from 'react';


const SizeBox = ({sizes}) => (
  <div className="sizeBox">
    {sizes.map(size => (
      <div key={size} className="size">{size}</div>
    ))}
  </div>
);

export default SizeBox;