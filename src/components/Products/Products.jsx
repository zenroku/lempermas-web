import React, { useState } from 'react'
import './Products.css'
import Product from './Product'
import ImageDetail from '../Details/ImageDetail'
import DetailProduct from '../Details/DetailProduct'
import CircularLoop from '../Feedback/CircularLoop'

function Products({ dataProducts, dataUsers, isLoaded }) {
    const [openImg, setOpenImg] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [detailImg, setDetailImg] = useState('')
    const [detailProduct, setDetailProduct] = useState([])
    const [detailUser, setDetailUser] = useState([])

    const openDetailImg = (bool, data) => {
        setOpenImg(bool)
        setDetailImg(data)
    }

    const openDetailProduct = (bool, product, user) => {
        setOpenDetail(bool)
        setDetailProduct(product)
        setDetailUser(user)
    }

    return (
        <div className="container products">
            <h4 data-aos="fade-left">PRODUK TERBARU !!!</h4>
            {isLoaded ? (
                <Product data={dataProducts} users={dataUsers} detailCallback={openDetailProduct} callbackImage={openDetailImg} />
            ) : (
                    <CircularLoop style={{
                        justifyContent: "center",
                        minHeight: 300,
                        alignItems: 'center'
                    }} />
                )}
            <ImageDetail openModal={openImg} closeModal={openDetailImg} detailImg={detailImg} />
            <DetailProduct openModal={openDetail} closeModal={openDetailProduct} detailProduct={detailProduct} detailUser={detailUser} />
        </div>
    )
}

export default Products
