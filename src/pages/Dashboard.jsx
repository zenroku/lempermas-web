import React, { useState, useEffect, useContext } from 'react'
import DashboardHeader from '../components/DashboardHeader/DashboardHeader'
import AddProduct from '../components/AddProduct/AddProduct'
import EditProduct from '../components/EditProduct/EditProduct'
import UpdateProfile from '../components/UpdateProfile/UpdateProfile'
import UpdatePassword from '../components/UpdateProfile/UpdatePassword'
import ListProduct from '../components/ListProduct/ListProduct'
import ListMember from '../components/ListMember/ListMember'
import { useRouteMatch, Switch, Redirect } from 'react-router-dom'
import { db, auth } from '../config/firebase'
import MemberRoute from '../privateroute/MemberRoute'
import { LoginContext } from '../context/authContext'
import { checkUserPost, checkUserRegistered } from '../functions/auth'

function Dashboard() {
    let { path } = useRouteMatch();
    const [user, setUser] = useState({})
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const { setIsLogin } = useContext(LoginContext)


    useEffect(() => {
        db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })))
        })

        db.collection('users').get()
            .then(res => {
                setUsers(res.docs.map(doc => doc.data()))
            })



        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                setUser(user)
                setIsLogin(true)
            } else {
                setUser(null)
            }
        });
        return () => {
            unsubscribe()
        }
    }, [setIsLogin])

    const getUserRegistered = checkUserRegistered(user, users)
    const getDataPosted = checkUserPost(products, user)

    return (
        <div>
            <DashboardHeader user={user} registered={getUserRegistered} posted={getDataPosted} />
            <div className="dashboardOuterContent">
                <Switch>
                    <MemberRoute path={`${path}/add`}>{getUserRegistered === undefined ? <Redirect to={`${path}/product`} /> : <AddProduct />}</MemberRoute>
                    <MemberRoute path={`${path}/updateProduct`}>{getDataPosted.length === 0 ? <Redirect to={`${path}/product`} /> : <EditProduct user={user} products={products} />}</MemberRoute>
                    <MemberRoute path={`${path}/updateProfile`}><UpdateProfile /></MemberRoute>
                    <MemberRoute path={`${path}/updatePassword`}><UpdatePassword /></MemberRoute>
                    <MemberRoute path={`${path}/product`}><ListProduct users={users} products={products} /></MemberRoute>
                    <MemberRoute path={`${path}/member`}><ListMember users={users} products={products} /></MemberRoute>
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard

