import React from 'react'
import './Services.css'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import UpdateIcon from '@material-ui/icons/Update';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import ServicesCard from './ServicesCard'

function Services() {
    return (
        <div className="services">
            <div data-aos="fade-left" className="services__title">
                <h4>Layanan Kami</h4>
            </div>
            <div className="services__container">
                <ServicesCard
                    title="Pesan Langsung"
                    Icon={WhatsAppIcon}
                    desc="Anda dapat memesan kepada kami melalui WhatsApp secara langsung, minimal pesanan 2 hari sebelumnya"
                />
                <ServicesCard
                    title="Buka Setiap Hari"
                    Icon={UpdateIcon}
                    desc="Toko kami buka setiap hari dari jam 6 pagi sampai jam 10 pagi. Hari senin toko tutup"
                />
                <ServicesCard
                    title="Dikirim Kerumah"
                    Icon={MotorcycleIcon}
                    desc="Kami menyediakan layanan untuk pengiriman ke rumah selama rumah anda ada dalam jangkauan pengiriman kami"
                />
            </div>
        </div>
    )
}

export default Services
