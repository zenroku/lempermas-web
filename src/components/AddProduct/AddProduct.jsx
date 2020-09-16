import React, { useState, useEffect } from 'react'
import DashboardBanner from '../DashboardHeader/DashboardBanner'
import CircularLoop from '../Feedback/CircularLoop'
import { useHistory } from 'react-router-dom'
import './AddProduct.css'
import { Paper, TextField, Typography, Button } from '@material-ui/core'
import CurrencyFormat from 'react-currency-format'
import DropdownInput from '../InputComponent/DropdownInput'
import UploadButton from '../InputComponent/UploadButton'
import { db, auth, storage } from '../../config/firebase'
import { v4 as uuid } from 'uuid';
import firebase from 'firebase'
import { namedStringCapitalize } from '../../functions/stringconvert'
import BaseWarning from '../Feedback/BaseWarning'
import BaseAgreement from '../Feedback/BaseAgreement'


function AddProduct() {
    const { push } = useHistory()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [unit, setUnit] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [user, setUser] = useState(null)
    const [progress, setProgress] = useState(0)
    const [popWarn, setPopWarn] = useState(false)
    const [popSuccess, setPopSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [agreement, setAgreement] = useState({ isOpen: false, title: '', message: '' })

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                setUser(user.uid)
            } else {
                setUser(null)
            }
        });

        return () => {
            unsubscribe()
        }

    }, [user])

    const submit = (event) => {
        event.preventDefault()

        if (name === '' || price === '' || category === '' || unit === '' || description === '' || image === null) {
            setPopWarn(true)
            setErrMsg('Data tidak boleh kosong! isi semua data yang dibutuhkan')
        } else {
            setAgreement({
                isOpen: true,
                title: 'Peringatan',
                message: 'Apakah anda yakin data produk sudah benar?',
                onConfirm: () => addProduct()
            })
        }
    }

    const addProduct = () => {
        setAgreement({ isOpen: false })
        const idImg = uuid()
        const uploadTask = storage.ref(`images/${idImg}`).put(image)

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
                        db.collection('products').add({
                            name: namedStringCapitalize(name),
                            price: parseInt(price),
                            unit,
                            category,
                            description,
                            uploader: user,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageId: idImg,
                            imageUrl: url
                        })
                            .then(() => {
                                setPopSuccess(true)
                                setErrMsg('Tambah Data Berhasil')
                            })
                            .catch(err => {
                                setPopWarn(true)
                                setErrMsg(err.message)
                            })


                        setName('')
                        setPrice(0)
                        setProgress(0)
                        setCategory('')
                        setImage(null)
                        setDescription('')
                    })
            }
        )
    }


    return (
        <div>
            <DashboardBanner />
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
                        <Button type="submit" variant="contained" color="primary">Tambah</Button>
                    </div>
                    <BaseWarning title="Error" message={errMsg} popWarning={popWarn} closeWarning={(val) => setPopWarn(val)} />
                    <BaseWarning title="Sukses" message={errMsg} popWarning={popSuccess} closeWarning={(val) => setPopSuccess(val)} onClickAction={() => push('/dashboard/product')} />
                    <BaseAgreement agreement={agreement} setAgreement={setAgreement} />
                </form>
            </Paper>
        </div>
    )
}

export default AddProduct
