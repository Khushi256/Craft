import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturedProduct from './components/FeaturedProducts'
import Sale from './components/Sale'
import Category from './components/Category'
import Footer from './components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <FeaturedProduct></FeaturedProduct>
        <Sale></Sale>
        <Category></Category>
        <Footer></Footer>
    </div>
  )
}

export default Home
