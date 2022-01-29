// import express from library express(yani library ka ander jo express ka function honga wo used kraga hum)
import express from 'express'
// express ka function ko humna const app ka naam sa assign kiya ha(library wala express ko ma na call krdia ha)
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('I am expres.js server')
})

app.get('/water', (req, res) => {
    res.send('Here is your water')
  })
  
  app.get('/food', (req, res) => {
    res.send('Here is your food')
  })
  
    



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// https://devcenter.heroku.com/articles/getting-started-with-nodejs