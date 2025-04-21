import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserLogout = () => {

    const token = localStorage.getItem('token')  // Get token from localStorage
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {  // sending the request to backend 
        headers: {
            Authorization: `Bearer ${token}`   // Pass the token in Authorization header
        }
    }).then((response) => {
        if (response.status === 200) {    // Check if the response status is 200 (OK)
            localStorage.removeItem('token') // Remove the token from localStorage
            navigate('/userlogin')
        }
    })

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout