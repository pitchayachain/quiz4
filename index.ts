import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { body, query, validationResult } from 'express-validator'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000
const SECRET = "SIMPLE_SECRET"

interface JWTPayload {
  username: string;
  password: string;
}

app.post('/login',
  (req, res) => {

    const { username, password } = req.body
    // Use username and password to create token.
    if({ username, password}){
     return res.status(200).json({
      "message": 'Login succesfully',
      "token": cors
    })
  }else if(!{ username, password}){
     return res.status(400).json({
      "message": "Invalid username or password"
      })
  }
  })

app.post('/register',
  (req, res) => {
    const { username, password, firstname, lastname, balance } = req.body
    if({ username, password, firstname, lastname, balance }){
       res.status(200).json({
        "message": "Register successfully"
      })
    }else if(!{ username, password, firstname, lastname, balance }){
       res.status(400).json({
        "message": "Username is already in used"
      })
    }

  })

app.get('/balance',
  (req, res) => {
    const token = req.query.token as string
    try {
      const { username } = jwt.verify(token, SECRET) as JWTPayload
       res.status(200).json({
          "name": "Peter Parker",
          "balance": 100
      })
    }
    catch (e) {
      //response in case of invalid token
      res.status(401).json({
       "message": "Invalid token"
    })
    }
  })

app.post('/deposit',
  body('amount').isInt({ min: 1 }),
  (req, res) => {

    //Is amount <= 0 ?
    if (!validationResult(req).isEmpty())
       res.status(400).json({ message: "Invalid data" })
  })

app.post('/withdraw',
  (req, res) => {
  })

app.delete('/reset', (req, res) => {

//  delete cors
  
   res.status(200).json({
    message: 'Reset database successfully'
  })
})

app.get('/me', (req, res) => {
  res.send({
  "firstname": "pitchaya",
  "lastname": "raihuay",
  "code": 620612159,
  "gpa": 4.00
  })
})

app.get('/demo', (req, res) => {
    res.status(200).json({
    message: 'This message is returned from demo route.'
  })
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))