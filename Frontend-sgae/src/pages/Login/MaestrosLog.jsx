import { useState } from 'react'
import Login from '../../components/Login'

export default function MaestroLog() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login usuario={"Maestros"}></Login>
    </>
  )
}


