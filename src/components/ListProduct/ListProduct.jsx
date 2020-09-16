import React, { useState } from 'react'
import DashboardBanner from '../DashboardHeader/DashboardBanner'
import { tableIcons } from '../../assets/material-table-icons/tableIcons'
import MaterialTable from 'material-table'
import './ListProduct.css'
import { Paper, Typography } from '@material-ui/core'
import ImageDetail from '../Details/ImageDetail'

function ListProduct({ users, products }) {

    const [openImg, setOpenImg] = useState(false)
    const [detailImg, setDetailImg] = useState('')

    const findExistUser = (uploaderId, usersData) => {
        const findUser = usersData && usersData.find((e) => e.userId === uploaderId);
        return findUser;
    };

    const extendedData = (product, user) => {
        const hasil = product && product.map((data) => {
            const getUser = findExistUser(data.uploader, user && user);
            const newData = { ...data, ...getUser, timestamp: data.timestamp.toDate() };
            return newData;
        });
        return hasil;
    };

    const columns = [
        { field: 'timestamp', title: 'Tanggal', width: 100, type: 'date' },
        { field: 'displayName', title: 'Penjual', width: 100 },
        { field: 'name', title: 'Produk', width: 400 },
        {
            field: 'imageUrl', title: 'Foto', width: 100, render: rowData => <img
                onClick={() => {
                    setOpenImg(true)
                    setDetailImg(rowData.imageUrl)
                }}
                alt=""
                src={rowData.imageUrl}
                style={{ width: 50, height: 50 }} />
        },
        { field: 'category', title: 'Kategori', width: 100 },
        { field: 'price', title: 'Harga', width: 100, type: 'numeric' },
        { field: 'unit', title: 'Satuan', width: 100, },
    ]

    return (
        <div className="listProductContainer">
            <DashboardBanner />
            <MaterialTable
                title="Data Produk"
                icons={tableIcons}
                data={extendedData(products, users)}
                columns={columns}
                detailPanel={rowData => {
                    return (
                        <Paper style={{ width: '100%', height: 'max-content', padding: 10 }}>
                            <Typography variant="h6">Deskripsi :</Typography>
                            <Typography variant="body1">{rowData.description}</Typography>
                        </Paper>
                    )
                }}
            />
            <ImageDetail openModal={openImg} closeModal={(val) => setOpenImg(val)} detailImg={detailImg} />
        </div>
    )
}

export default ListProduct
