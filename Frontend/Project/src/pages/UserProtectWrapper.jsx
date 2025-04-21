// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


// // function created and check the children
// const UserProtectWrapper = ({ children }) => {
//   const token = localStorage.getItem('token');  // fecth the token from storage 
//   const navigate = useNavigate();

//   // useEffect to handle side effects like navigation
//   useEffect(() => {
//     if (!token) {
//       navigate('/userlogin'); // Redirect if no token is found
//     }
//   }, [token, navigate]); // Dependencies: token and navigate

//   return <>{children}</>;
// };

// export default UserProtectWrapper;
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../Context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper