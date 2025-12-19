import React from 'react'
import Navbar1 from './Navbar1'
import IndexBody from './IndexBody'
import Carousel from './Carousel'
import Features from './Features'
import Footer from './Footer'

const Index = () => {
  return (
    <div>
        <Navbar1 />
        <IndexBody />
        <Carousel />
        <Features />
        <Footer />
    </div>
  )
}

export default Index