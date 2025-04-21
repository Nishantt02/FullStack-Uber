import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>

      <div className='bg-cover bg-center bg-[url("https://upload.wikimedia.org/wikipedia/commons/9/91/Modern_British_LED_Traffic_Light.jpg")] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold'>Getting started with Uber</h2>
          <h1>.</h1>
          <Link to='/userlogin' className='flex items-center justify-center w-full bg-black text-white py-2 px-20 rounded-xl'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
