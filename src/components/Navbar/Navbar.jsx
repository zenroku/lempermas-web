import React, { useEffect, useState, useContext } from 'react'
import { LoginContext } from '../../context/authContext'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../../config/firebase'
import MemberButton from './MemberButton/MemberButton'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const { isLogin, setIsLogin } = useContext(LoginContext)
    const [openMember, setOpenMember] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        });
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100
            if (isTop !== true) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        })

        return () => {
            unsubscribe()
            window.removeEventListener('scroll', () => {
                setScrolled(false)
            })
        }
    }, [setIsLogin])

    return (
        <div className={scrolled ? 'navbar__scrolled' : 'navbar'}>
            <div className="container navbar__container">
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <div className="navbar__logo">
                        <h4>Lempermas</h4>
                    </div>
                </Link>
                <div className="navbar__navigation">
                    <ul className="navbar__ul">
                        <Link style={{ textDecoration: 'none' }} className={location.pathname === '/menu' ? "nav--active" : null} to="/menu"><li className="navbar__li">Menu</li></Link>
                        {isLogin ? (<Link style={{ textDecoration: 'none' }} onClick={(event) => setOpenMember(event.currentTarget)} ><li className="navbar__li">Member</li></Link>) : (
                            <Link style={{ textDecoration: 'none' }} to="/login"><li className="navbar__li">Login</li></Link>
                        )}
                        <MemberButton node={openMember} close={(val) => setOpenMember(val)} />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
