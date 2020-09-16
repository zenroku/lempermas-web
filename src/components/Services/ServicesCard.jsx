import React from 'react'
import './Services.css'

function ServicesCard({ title, Icon, desc }) {
    return (
        <div data-aos="fade-right" className="servicesCard">
            <Icon className="servicesCard__icon" />
            <h4 className="servicesCard__title">{title}</h4>
            <div className="servicesCard__description">
                <p>{desc}</p>
            </div>
            <a className="outsideLink" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=+6289687583180"><button className="servicesCard__button">Whatsapp</button></a>
        </div>
    )
}

export default ServicesCard
