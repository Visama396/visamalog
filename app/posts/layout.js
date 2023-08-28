export default function PostsLayout ({ children }) {
  return (
    <div>
      <marquee style={{ background: '#eee', color: 'violet', fontWeight: '700' }}>El mejor programador de Next.js</marquee>
      {children}
    </div>
  )
}
