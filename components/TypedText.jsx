'use client'

import { useEffect } from 'react'
import Typed from 'typed.js'

export function TypedText () {
  useEffect(() => {
    const options = {
      strings: ['Next.js', 'Unreal Engine', 'Unity', 'Flutter'],
      typeSpeed: 100,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    }

    const typed = new Typed('.roles', options)

    return () => {
      typed.destroy()
    }
  }, [])

  return <span className='roles'>Unity</span>
}
