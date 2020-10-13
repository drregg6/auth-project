import React from 'react'

const Main = ({ children, mainBackground, mainNoPadding }) => {
  return (
    <div className={`main ${ mainBackground ? 'main-background' : '' } ${ mainNoPadding ? 'main-no-padding' : '' }`}>
      { children }
    </div>
  )
}

export default Main;