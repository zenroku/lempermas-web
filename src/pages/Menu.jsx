import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import MenuHeader from '../components/MenuHeader/MenuHeader'
import FilterBar from '../components/FilterBar/FilterBar'
import Products from '../components/Products/Products'
import { db } from '../config/firebase'

function Menu() {
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [category, setCategory] = useState('')
    const [keyword, setKeyword] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => doc.data()))
            setIsLoaded(true)
        })

        db.collection('users').get()
            .then(res => {
                setUsers(res.docs.map(doc => doc.data()))
                setIsLoaded(true)
            })

    }, [])

    const filter = (data, key, ctgr) => {

        if (key !== '' || ctgr !== '') {
            if (key !== '' && ctgr !== '') {
                // power search logic
                return data.filter(elm => elm.name.toLowerCase().indexOf(key.toLowerCase()) > -1 && elm.category === ctgr)
            } else if (key !== '') {
                // search logic
                return data.filter(elm => elm.name.toLowerCase().indexOf(key.toLowerCase()) > -1)
            } else if (ctgr !== '') {
                // filter Category
                const fltrCtgr = data && data.filter((elm) => elm.category === ctgr)
                return fltrCtgr
            }
        } else {
            // 'default data'
            return data
        }
    }


    return (
        <div>
            <Navbar />
            <MenuHeader />
            <FilterBar categoryCallback={val => setCategory(val)} currentVal={category} searchCallback={val => setKeyword(val)} />
            <Products
                isLoaded={isLoaded}
                dataProducts={filter(products, keyword, category)}
                dataUsers={users} />
            <Footer />
        </div>
    )
}

export default Menu
