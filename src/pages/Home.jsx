import React from 'react'
import FlyingPlane from '../components/FlyingPlane'
import Hero from '../components/sections/Hero'
import BrandMarquee from '../components/sections/BrandMarquee'
import FeaturedCatalog from '../components/sections/FeaturedCatalog'
import HowItWorks from '../components/sections/HowItWorks'
import Deliveries from '../components/sections/Deliveries'
import WhyUs from '../components/sections/WhyUs'
import Faq from '../components/sections/Faq'
import FinalCta from '../components/sections/FinalCta'

const Home = () => (
  <>
    <FlyingPlane />
    <Hero />
    <BrandMarquee />
    <FeaturedCatalog />
    <HowItWorks />
    <Deliveries />
    <WhyUs />
    <Faq />
    <FinalCta />
  </>
)

export default Home
