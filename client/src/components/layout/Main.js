import React from 'react'

const Main = ({ children, mainBackground }) => {
  return (
    <div className={`main ${ mainBackground && 'main-background' }`}>
      { children }
    </div>
  )
}

export default Main;