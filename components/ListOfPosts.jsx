import Link from 'next/link'
import { LikeButton } from './LikeButton'

const fetchPosts = () => {
  // getStaticProps
  // --> return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())

  // getServerSideProps
  // --> return fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' }).then(res => res.json())

  // incremental static regeneration
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {
      revalidate: 60
    }
  }).then(res => res.json())
}

export async function ListOfPosts () {
  const posts = await fetchPosts()

  return posts.slice(0, 5).map(post => (
    <article key={post.id}>
      <Link href={`/posts/${post.id}`}>
        <h2 style={{ color: '#09f' }}>{post.title}</h2>
        <p>{post.body}</p>
        <LikeButton />
      </Link>
    </article>
  ))
}
