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
    console.log(error)
  }
}
export default main

main()
