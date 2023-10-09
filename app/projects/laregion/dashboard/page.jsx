import { Listado } from '@/components/Listado'

export default async function DashboardPage () {
  return (
    <main>
      <section className='laregion'>
        <header>
          <h1>Reparto 24</h1>
          <h2>Ejemplares: </h2>
        </header>
        <Listado />
      </section>
    </main>
  )
}
