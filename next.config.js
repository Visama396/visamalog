/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.dicebear.com']
  },
  env: {
    DB_HOST: 'aws.connect.psdb.cloud',
    DB_USERNAME: 'it0gtvpstcd3du1do19s',
    DB_PASSWORD: 'pscale_pw_ReEgCu1N6FXfQ7An7xQcXTp4ZfjTtuxOKOqOHESyX6q'
  }
}

module.exports = nextConfig