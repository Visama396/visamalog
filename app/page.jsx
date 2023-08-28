import { TypedText } from '@/components/TypedText'
import Link from 'next/link'

export default function HomePage () {
  return (
    <main>
      <section className='banner'>
        <h1>
          <span>Hallo! Ich bin </span>
          <span className='name'>Víctor</span>
          <div>Ein <TypedText />Entwickler</div>
        </h1>
        <h2>
          Ich erfülle kreative Projects mit sichere & aktuelle Technologien.
        </h2>
        <Link href='#about' className='scroll-down'><span />Scroll</Link>
      </section>
      <h2>Updating website. Work in Progress!</h2>
    </main>
  )
}
