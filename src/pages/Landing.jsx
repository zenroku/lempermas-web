import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroImage from '../components/Hero Image/HeroImage'
import Services from '../components/Services/Services'
import Footer from '../components/Footer/Footer'

function Landing() {

    return (
        <div>
            <Navbar />
            <HeroImage />
            <Services />
            <Footer />
        </div>
    )
}

export default Landing
