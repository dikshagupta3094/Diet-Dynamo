import React from 'react'
import Footer from '../Components/Footer.jsx'
const HomeLayout = ({children}) => {
  return (
    <div>
        Home Layout

        {children}
      <Footer/>
    </div>
  )
}

export default HomeLayout
