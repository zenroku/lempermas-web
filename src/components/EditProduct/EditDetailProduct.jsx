import React, { useEffect, useState } from 'react'
import EditDetailBanner from './EditDetailBanner'
import { useParams, useHistory } from 'react-router-dom'
import { Paper, TextField, Button, Typography } from '@material-ui/core'
import DropdownInput from '../InputComponent/DropdownInput'
import UploadButton from '../InputComponent/UploadButton'
import CurrencyFormat from 'react-currency-format'
import CircularLoop from '../Feedback/CircularLoop'
import { db, storage } from '../../config/firebase'
import firebase from 'firebase'
import { v4 as uuid } from 'uuid';
import { namedStringCapitalize } from '../../functions/stringconvert'
import BaseAgreement from '../Feedback/BaseAgreement'
import BaseWarning from '../Feedback/BaseWarning'


function EditDetailProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [unit, setUnit] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [imageId, setImageId] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const { id } = useParams()
    const { push } = useHistory()
    const [agreement, setAgreement] = useState({ isOpen: false, title: '', message: '' })
    const [popWarn, setPopWarn] = useState(false)
    const [popSuccess, setPopSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        db.collection('products').doc(id).get()
            .then((res) => {
                setName(res.data().name)
                setPrice(res.data().price)
                setUnit(res.data().unit)
                setCategory(res.data().category)
                setDescription(res.data().description)
                setImageId(res.data().imageId)
            })
    }, [id])

    const submit = (event) => {

        event.preventDefault()
        if (name === '' || price === '' || category === '' || unit === '' || description === '') {
            setPopWarn(true)
            setErrMsg('Data tidak boleh kosong! isi semua data yang dibutuhkan')
        } else if (image === null) {
            setAgreement({
                isOpen: true,
                title: 'Peringatan',
                message: 'Apakah anda yakin tidak update Foto Produk?',
                onConfirm: () => updateProduct()
            })
        } else {
            setAgreement({
                isOpen: true,
                title: 'Peringatan',
                message: 'Apakah anda yakin data sudah benar?',
                onConfirm: () => updateProduct()
            })
        }

    }

    const updateProduct = () => {
        setAgreement({ isOpen: false })
        if (image !== null) {
            const idImg = uuid()
            const uploadTask = storage.ref(`images/${idImg}`).put(image)
            const deleteImg = storage.ref(`images/${imageId}`)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                (error) => {
                    setPopWarn(true)
                    setErrMsg(error.message)
                },
                () => {
                    storage
                        .ref("images")
                        .child(idImg)
                        .getDownloadURL()
                        .then(url => {
                            if (imageId !== '') {
                                deleteImg.delete()
                            }
                            db.collection('products').doc(id).update({
                                name: namedStringCapitalize(name),
                                price: parseInt(price),
                                unit,
                                category,
                                description,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                imageId: idImg,
                                imageUrl: url
                            })
                                .then(() => {
                                    setProgress(0)
                                    setPopSuccess(true)
                                    setErrMsg('Update Berhasil')
                                })
                                .catch(() => {
                                    setPopWarn(true)
                                    setErrMsg('Update Gagal')
                                })
                        })
                }
            )
        } else if (image === null) {
            setProgress(1)
            db.collection('products').doc(id).update({
                name: namedStringCapitalize(name),
                price: parseInt(price),
                unit,
                category,
                description,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then(() => {
                    setProgress(0)
                    setPopSuccess(true)
                    setErrMsg('Update Berhasil')

                })
                .catch(() => {
                    setPopWarn(true)
                    setErrMsg('Update Gagal')
                })

        }
    }

    return (
        <div>
            <EditDetailBanner />
            <Paper className="addProduct__paperContainer">
                <form onSubmit={submit} className="addProduct__form" >
                    <div className="addProduct__row">
                        <TextField
                            className="addProduct__name"
                            label="Nama Produk"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <DropdownInput tipe="category" categoryCallback={(val) => setCategory(val)} currentVal={category} />
                    </div>
                    <div className="addProduct__row">
                        <CurrencyFormat
                            className="addProduct__price"
                            thousandSeparator={true}
                            prefix={'Rp. '}
                            variant="outlined"
                            label="Harga"
                            customInput={TextField}
                            value={price}
                            onValueChange={values => (setPrice(values.value))}
                            fullWidth
                        />
                        <Typography className="addProduct__slash" variant="subtitle2">per</Typography>
                        <DropdownInput tipe="unit" categoryCallback={(val) => setUnit(val)} currentVal={unit} />
                    </div>
                    <div className="addProduct__row">
                        <TextField
                            className="addProduct__description"
                            label="Deskripsi Produk"
                            multiline
                            rows={10}
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div className="addProduct__row">
                        {progress !== 0 ? (<CircularLoop
                            style={{
                                justifyContent: "center",
                                minWidth: 300,
                                alignItems: 'center'
                            }}
                        />) : (<UploadButton imageUploadCallback={(val => setImage(val))} />)}
                        <Button type="submit" variant="contained" color="primary">Update</Button>
                    </div>
                    <BaseAgreement agreement={agreement} setAgreement={setAgreement} />
                </form>
            </Paper>
            <BaseWarning title="Sukses" message={errMsg} popWarning={popSuccess} closeWarning={(val) => setPopSuccess(val)} onClickAction={() => push('/dashboard/updateProduct')} />
            <BaseWarning title="Error" message={errMsg} popWarning={popWarn} closeWarning={(val) => setPopWarn(val)} />
        </div>
    )
}

export default EditDetailProduct
