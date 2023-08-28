import Link from 'next/link'
const projects = [
  {
    name: 'La Región',
    url: '/laregion',
    key: 'laregion'
  }
]

export default function ProjectsPage () {
  return (
    <main>
      <section className='projects'>
        <h1>Projects</h1>

        <div>
          {projects.map(project => (
            <Link href={`/projects/${project.url}`} key={project.key}>
              {project.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
