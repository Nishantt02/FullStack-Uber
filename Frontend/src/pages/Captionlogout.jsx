import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Captionlogout = () => {

    const token = localStorage.getItem('token')  // Get token from localStorage
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/captain/logoutcaption`, {  // sending the request to backend 
        headers: {
            Authorization: `Bearer ${token}`   // Pass the token in Authorization header
        }
    }).then((response) => {
        if (response.status === 200) {    // Check if the response status is 200 (OK)
            localStorage.removeItem('captainToken') // Remove the token from localStorage
            navigate('/captionlogin')
        }
    })

    return (
        <div>captionlogout</div>
    )
}

export default Captionlogout