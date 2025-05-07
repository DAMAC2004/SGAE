import { useState } from 'react'
import Login from '../../components/Login'

export default function AdminLog() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login usuario={"Administrador"}></Login>
    </>
  )
}


