import React from 'react'
import DashboardBanner from '../DashboardHeader/DashboardBanner'
import { tableIcons } from '../../assets/material-table-icons/tableIcons'
import MaterialTable from 'material-table'

function ListMember({ users, products }) {

    const getTotalPosts = (post, user) => {
        const extendData = user && user.map(doc => {
            const postedArr = post.filter(elm => elm.uploader === doc.userId)
            const newData = { ...doc, totalPosts: postedArr.length }
            return newData
        })
        return extendData
    }


    const columns = [
        { field: 'email', title: 'Email', width: 150 },
        {
            field: 'profileImageUrl', title: 'Foto', width: 100, render: rowData => <img
                alt=""
                src={rowData.profileImageUrl}
                style={{ width: 50, borderRadius: 50 }} />
        },
        { field: 'displayName', title: 'Nama', width: 150 },
        { field: 'totalPosts', title: 'Total Produk', width: 150, type: 'numeric' },
    ]

    return (
        <div>
            <DashboardBanner />
            <MaterialTable
                title="Member"
                columns={columns}
                data={getTotalPosts(products, users)}
                icons={tableIcons}

            />
        </div>
    )
}

export default ListMember
