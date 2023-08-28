import { connect } from '@planetscale/database'

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}

const date = new Date()
// const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
let total = 0

export default async function DashboardPage () {
  const conn = connect(config)
  const listado24 = await conn.execute('SELECT * FROM repartos WHERE delivery = 24 ORDER BY `order`')

  return (
    <main>
      <section className='laregion'>
        <header>
          <h1>Reparto 24</h1>
          <h2>Ejemplares: {total}</h2>
        </header>
        <div>
          <ul>
            {listado24.rows.map(cliente => {
              if ((cliente.admission === 'true') && (cliente[days[date.getDay()]] >= 1)) {
                total += cliente[days[date.getDay()]]
                return <li key={cliente.address}><strong>{cliente[days[date.getDay()]]}</strong> {cliente.address}</li>
              } else {
                return null
              }
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}
