import React, { useState, useEffect } from 'react'
import './UpdateProfile.css'
import DashboardBanner from '../DashboardHeader/DashboardBanner'
import UploadButton from '../InputComponent/UploadButton'
import CircleProgress from '../Feedback/CircularLoop'
import { Paper, TextField, CardHeader, Card, Avatar, CardContent, Typography, Button } from '@material-ui/core'
import { db, auth, storage } from '../../config/firebase'
import { v4 as uuid } from 'uuid';
import { namedStringCapitalize } from '../../functions/stringconvert'
import ImageDetail from '../Details/ImageDetail'
import BaseAgreement from '../Feedback/BaseAgreement'



function UpdateProfile() {
    const [image, setImage] = useState(null)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [profileImageId, setProfileImageId] = useState('')
    const [newAccount, setNewAccount] = useState(false)
    const [user, setUser] = useState(null)
    const [progress, setProgress] = useState(0)
    const [success, setSuccess] = useState(false)
    const [openImg, setOpenImg] = useState(false)
    const [agreement, setAgreement] = useState({ isOpen: false, title: '', message: '' })


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                setUser(user)
                if (user.displayName === '') {
                    setNewAccount(true)
                } else {
                    setDisplayName(user.displayName ? user.displayName : '')
                    setEmail(user.email ? user.email : '')
                }

            } else {
                setUser(null)
            }



            db.collection('users').doc(user.uid).get()
                .then((res) => {
                    if (res.data() === undefined) {
                        setNewAccount(true)
                    } else {
                        setProfileImageUrl(res.data().profileImageUrl)
                        setProfileImageId(res.data().profileImageId)
                    }

                }
                )
        });
        return () => {
            unsubscribe()
        }
    }, [])



    const submit = (event) => {
        event.preventDefault()

        if (image !== null) {
            const idImg = uuid()
            const uploadTask = storage.ref(`users/${idImg}`).put(image)
            const deleteImg = storage.ref(`users/${profileImageId}`)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                (error) => {
                    console.log(error)
                },
                () => {

                    storage
                        .ref("users")
                        .child(idImg)
                        .getDownloadURL()
                        .then(url => {
                            if (profileImageId !== '') {
                                deleteImg.delete()
                                    .then(res => console.log(res))
                                    .catch(err => console.log(err))
                            }
                            user.updateProfile({
                                displayName: namedStringCapitalize(displayName),
                                photoURL: url
                            }).then(() => console.log('upload success'))

                            db.collection('users').doc(user.uid).set({
                                displayName: namedStringCapitalize(displayName),
                                profileImageId: idImg,
                                profileImageUrl: url,
                                userId: user.uid,
                                email,
                            }).then(() => console.log('upload success'))

                            setSuccess(true)
                            setProgress(0)
                        })
                }
            )

        } else {

            if (displayName === '' && image === null) {
                setAgreement({
                    isOpen: true,
                    title: 'Peringatan',
                    message: 'Apakah anda setuju data kosong? klik OK jika anda ingin dapat fitur Tambah Produk',
                    onConfirm: () => justString()
                })
            } else {
                justString()
            }
        }

    }

    const justString = () => {
        setAgreement({
            ...agreement,
            isOpen: false
        })
        user.updateProfile({
            displayName: namedStringCapitalize(displayName)
        }).then(() => console.log('change name success'))

        db.collection('users').doc(user.uid).set({
            userId: user.uid,
            displayName: namedStringCapitalize(displayName),
            profileImageId,
            profileImageUrl,
            email,
        }).then(() => {
            console.log('phone number changed')
            setSuccess(true)
        })
    }



    return (
        <div>
            <DashboardBanner />
            <Paper className="updateProfile">
                <div className="updateProfileContainer">
                    <Card className="updateProfile__card">
                        <CardHeader onClick={() => setOpenImg(true)}
                            avatar={
                                <Avatar className="updateProfile__imgDetail"
                                    src={profileImageUrl}
                                />
                            }
                            title='tentukan Nama'
                            subheader='Lengkap anda'
                        />
                        <CardContent>{newAccount ? (<Typography>Akun Baru</Typography>) : (
                            <Typography>Profil Anda</Typography>
                        )}
                        </CardContent>
                    </Card>
                    <form onSubmit={submit} className="updateProfile__form">
                        <div className="updateProfile__textField">
                            <TextField
                                label="Nama Lengkap"
                                variant="outlined"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfile__upload">
                            {progress !== 0 ? (<CircleProgress style={{
                                justifyContent: "center",
                                minWidth: 250,
                                alignItems: 'center'
                            }} />) : (<UploadButton imageUploadCallback={(val) => setImage(val)} />)}
                            <Button type="submit" disabled={success} variant="contained" color="primary">{success ? 'Berhasil !' : 'Update'}</Button>
                        </div>
                        <BaseAgreement
                            agreement={agreement}
                            setAgreement={setAgreement}
                        />
                    </form>
                </div>
            </Paper>
            <ImageDetail openModal={openImg} closeModal={(val) => setOpenImg(val)} detailImg={profileImageUrl} />
        </div>
    )
}

export default UpdateProfile
