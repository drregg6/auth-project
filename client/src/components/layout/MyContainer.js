import React from 'react';

const MyContainer = (props) => {
  return (
    <div className="my-container">
      { props.children }
    </div>
  )
}

export default MyContainer;