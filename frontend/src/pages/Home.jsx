import React, { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

function Home() {
  const { user } = useContext(UserContext)
  useEffect(() => {
    console.log(user);
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home