import mongoose from 'mongoose'
import config from './app/config'
import app from './app'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log('running on ', config.port as string)
    })
  } catch (error) {
    console.error('Database connection failed', error)
    process.exit(1)
  }
}
export default main

main()
