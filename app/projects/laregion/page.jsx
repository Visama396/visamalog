'use client'
import { useState } from 'react'
import { connect } from '@planetscale/database'
import { useRouter } from 'next/navigation'

export default function LaRegionPage () {
  const config = {
    host: process.env.NEXT_DB_HOST,
    username: process.env.NEXT_DB_USERNAME,
    password: process.env.NEXT_DB_PASSWORD
  }

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const router = useRouter()

  async function checkAuth (username) {
    const conn = connect(config)
    const query = 'SELECT * FROM repartos_users WHERE user = :name'
    const params = {
      name: username
    }

    const result = await conn.execute(query, params)
    return result.rows[0]
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = await checkAuth(formData.username)

    if (user === undefined) {
      console.log('User not found')
      return
    }
    if (formData.password !== user.password) {
      console.log('Password is incorrect')
      return
    }

    // Send to dashboard
    router.push('/projects/laregion/dashboard')
  }

  return (
    <div className='form_container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' value={formData.user} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' value={formData.password} onChange={handleChange} required />
        </div>
        <input type='submit' name='submit' value='Iniciar sesión' />
      </form>
    </div>
  )
}
