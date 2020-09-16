import React, { useState } from 'react'
import './Footer.css'
import FooterComp from './FooterComp'
import RoomIcon from '@material-ui/icons/Room';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import StoreIcon from '@material-ui/icons/Store';
import CommentIcon from '@material-ui/icons/Comment';
import Address from './Address/Address';
import Advice from '../Advice and Report/Advice';

function Footer() {
    const [openAddress, setOpenAddress] = useState(false)
    const [openAdvice, setOpenAdvice] = useState(false)

    return (
        <footer className="footer">
            <div className="footer__top">
                <FooterComp modalCallback={(value) => setOpenAddress(value)} title="Alamat Toko" Icon={StoreIcon} />
                <FooterComp url="https://api.whatsapp.com/send?phone=+6289687583180" title="Kontak Kami" Icon={WhatsAppIcon} />
                <FooterComp modalCallback={(value) => setOpenAdvice(value)} title="Beri Saran Website" Icon={CommentIcon} />
                <FooterComp url="https://goo.gl/maps/gbepc32awbPhME7JA" title="Google Maps" Icon={RoomIcon} />
            </div>
            <div className="footer__bottom">
                <h4>Copyright © 2020 Lempermas. All rights reserved.</h4>
            </div>
            <Address openModal={openAddress} closeModal={(value) => setOpenAddress(value)} />
            <Advice openModal={openAdvice} closeModal={(value) => setOpenAdvice(value)} />
        </footer>
    )
}

export default Footer
