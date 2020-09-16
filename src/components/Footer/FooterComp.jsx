import React from 'react'
import './Footer.css'

function FooterComp({ url, title, Icon, modalCallback }) {
    return (
        <div onClick={() => modalCallback ? modalCallback(true) : null} data-aos="fade-down" className="footerComp">
            <h4>{title}</h4>
            <div className="footerComp__circleButton">
                <a target="_blank" rel="noopener noreferrer" href={url}>
                    <Icon className="footerComp__icon" />
                </a>
            </div>
        </div>
    )
}

export default FooterComp
