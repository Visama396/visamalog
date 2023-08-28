import Image from "next/image"

const fetchComments = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 3000))

  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    next: {
      revalidate: 60
    }
  }).then(res => res.json())
}

export default async function CommentsPage ({ params }) {
  const { id } = params
  const comments = await fetchComments(id)

  return (
    <ul style={{ background: '#444', fontSize: '10px' }}>
      {comments.map(comment => (
        <li key={comment.id}>
          <Image width='16' height='16' alt={comment.name} src={`https://avatars.dicebear.com/api/pixel-art-neutral/${comment.email}.svg`} />
          <h4>{comment.name}</h4>
          <small>{comment.body}</small>
        </li>
      ))}
    </ul>
  )
}
