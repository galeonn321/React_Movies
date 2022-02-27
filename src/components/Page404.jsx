import React from 'react'
import { Link } from 'react-router-dom'

export const Page404 = () => {
  return (
    <div className='text-center text-light bg-dark'>
        <h1>
            404 This page or film does not exist
        </h1>
            <Link to="/" className="btn btn-primary"> Go back</Link>
    </div>
  )
}
