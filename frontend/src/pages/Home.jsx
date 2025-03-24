import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BastSeller from '../components/BastSeller'
import OurPolicy from '../components/OurPolicy'
import NewssletterBox from '../components/NewssletterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BastSeller/>
      <OurPolicy/>
      <NewssletterBox/>
    </div>
  )
}

export default Home
