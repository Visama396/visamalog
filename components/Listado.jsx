'use client'
import { useState } from 'react'
import { connect } from '@planetscale/database'
import styles from './Listado.module.scss'

const config = {
  host: process.env.NEXT_DB_HOST,
  username: process.env.NEXT_DB_USERNAME,
  password: process.env.NEXT_DB_PASSWORD
}

const date = new Date()
// const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export async function Listado () {
  const conn = connect(config)
  const listado24 = await conn.execute('SELECT * FROM repartos WHERE delivery = 24 ORDER BY `order`')
  const [total, setTotal] = useState(0)

  function updateTotal (newTotal) {
    setTotal(total + newTotal)
  }

  return (
    <div>
      <h3>{total}</h3>
      <ul>
        {listado24.rows.map(cliente => {
          if ((cliente.admission === 'true') && (cliente[days[date.getDay()]] >= 1)) {
            updateTotal(cliente[days[date.getDay()]])
            return <li key={cliente.address}><strong>{cliente[days[date.getDay()]]}</strong> {cliente.address}</li>
          } else {
            return null
          }
        })}
      </ul>
    </div>
  )
}
