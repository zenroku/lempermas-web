import React, { useState } from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import BaseModal from '../components/Feedback/BaseModal'
import ForgotPassword from '../components/LoginForm/ForgotPassword'

function Login() {
    const [openModal, setOpenModal] = useState(false)

    const openForgotPassword = (value) => {
        setOpenModal(value)
    }

    return (
        <div className="login">
            <LoginForm forgotCallback={openForgotPassword} />
            <BaseModal setOpenModal={openModal} setCloseModal={openForgotPassword}>
                <ForgotPassword closeForgot={openForgotPassword} />
            </BaseModal>
        </div>
    )
}

export default Login
