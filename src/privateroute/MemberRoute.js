import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LoginContext } from '../context/authContext'

const MemberRoute = ({ children, ...rest }) => {
    const { isLogin } = useContext(LoginContext)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogin ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    )
}

export default MemberRoute
