import React from 'react';

const MyForm = ({ children, inverse }) => {
  return (
    <div className={`my-form ${inverse && 'inverse-form'}`}>
      { children }
    </div>
  )
}

export default MyForm;