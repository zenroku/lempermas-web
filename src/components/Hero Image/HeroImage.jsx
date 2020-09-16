import React from 'react'
import hero from '../../assets/img/hero-image.jpg'
import './HeroImage.css'


function HeroImage() {
    return (
        <div className='heroImage'>
            <img className="heroImage__image" src={hero} alt="img"></img>
            <h4 data-aos="fade-down">Menyajikan beberapa produk Kue dan Masakan dengan cita rasa yang beragam dari berbagai produsen hebat</h4>
        </div>
    )
}

export default HeroImage
