import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import productRouter from './routes/productRoute'
// import orderRouter from './routes/orderRoute'

const app: Application = express()

app.use(express.json())
app.use(cors())

//application routes
// app.use('/api/products', productRouter)
// app.use('/api/orders', orderRouter)

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World')
})

app.listen(3000)
export default app
