'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.scss'

const links = [
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Projects',
    route: '/projects'
  },
  {
    label: 'Resume',
    route: '/resume'
  }
]

export function Navigation () {
  const pathname = usePathname()

  return (
    <nav className={styles.top_nav}>
      <div className={styles.nav_home}>
        <Link href='https://visamalog.com'>Visamalog</Link>
      </div>

      <div className={styles.menu}>
        {links.map(({ label, route, active }) => (
          <Link key={route} href={route} className={(pathname === route) ? styles.active : ''}>{label}</Link>
        ))}
      </div>
    </nav>
  )
}
