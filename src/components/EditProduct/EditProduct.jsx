import React, { useState } from 'react'
import { Paper, Typography } from '@material-ui/core'
import DashboardBanner from '../DashboardHeader/DashboardBanner'
import { tableIcons } from '../../assets/material-table-icons/tableIcons'
import MaterialTable from 'material-table'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { db, storage } from '../../config/firebase'
import { Switch, useRouteMatch, Route, useHistory } from 'react-router-dom'
import EditDetailProduct from './EditDetailProduct'
import BaseAgreement from '../Feedback/BaseAgreement'
import BaseWarning from '../Feedback/BaseWarning'
import ImageDetail from '../Details/ImageDetail'

function EditProduct({ products, user }) {
    const { path } = useRouteMatch()
    const history = useHistory()
    const [agreement, setAgreement] = useState({ isOpen: false, title: '', message: '' })
    const [popWarn, setPopWarn] = useState(false)
    const [popSuccess, setPopSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [openImg, setOpenImg] = useState(false)
    const [detailImg, setDetailImg] = useState(false)

    const getTotalPosts = (post, user) => {
        const changeDate = post.map(elm => {
            const getDate = elm.timestamp
            const newArr = { ...elm, timestamp: getDate && getDate.toDate() }
            return newArr
        })
        const filter = changeDate.filter(elm => elm.uploader === user.uid)
        return filter
    }

    const columns = [
        { field: 'timestamp', title: 'Tanggal', width: 100, type: 'date' },
        { field: 'name', title: 'Produk', width: 100 },
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
        { field: 'price', title: 'Harga', width: 100, type: "numeric" },
        { field: 'unit', title: 'Satuan', width: 100 },
    ]

    const deleteData = (id, imageId) => {
        const deleteImg = storage.ref(`images/${imageId}`)
        db.collection('products').doc(id).delete()
            .then(() => {
                deleteImg.delete()
                setAgreement({
                    isOpen: false
                })
                setPopSuccess(true)
                setErrMsg('Data berhasil dihapus')
            })
            .catch(() => {
                setPopWarn(true)
                setErrMsg('Data Gagal dihapus')
            })
    }

    return (

        <Switch>
            <Route exact path={path}>
                <div>
                    <DashboardBanner />
                    <MaterialTable
                        title="Edit / Delete"
                        columns={columns}
                        data={getTotalPosts(products, user)}
                        icons={tableIcons}
                        detailPanel={rowData => {
                            return (
                                <Paper style={{ width: '100%', height: 'max-content', padding: 10 }}>
                                    <Typography variant="h6">Deskripsi :</Typography>
                                    <Typography variant="body1">{rowData.description}</Typography>
                                </Paper>
                            )
                        }}
                        actions={[
                            {
                                icon: () => <EditIcon />,
                                tooltip: 'Edit Data',
                                onClick: (event, rowData) => {
                                    history.push(`${path}/edit/${rowData.id}`)
                                }
                            },
                            {
                                icon: () => <DeleteIcon />,
                                tooltip: 'Delete Data',
                                onClick: (event, rowData) => {
                                    setAgreement({
                                        isOpen: true,
                                        title: 'Peringatan',
                                        message: 'apakah anda yakin menghapus produk ini?',
                                        onConfirm: () => deleteData(rowData.id, rowData.imageId)
                                    })
                                }
                            }
                        ]}
                    />
                </div>
                <BaseAgreement agreement={agreement} setAgreement={setAgreement} />
                <BaseWarning title="Berhasil" message={errMsg} popWarning={popWarn} closeWarning={(val) => setPopWarn(val)} />
                <BaseWarning title="Berhasil" message={errMsg} popWarning={popSuccess} closeWarning={(val) => setPopSuccess(val)} />
                <ImageDetail openModal={openImg} closeModal={(val) => setOpenImg(val)} detailImg={detailImg} />
            </Route>
            <Route path={`${path}/edit/:id`}><EditDetailProduct /></Route>
        </Switch>
    )
}

export default EditProduct
