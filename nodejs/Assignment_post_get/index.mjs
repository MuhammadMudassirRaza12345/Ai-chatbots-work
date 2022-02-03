// import express from library express(yani library ka ander jo express ka function honga wo used kraga hum)
import express from 'express'
// express ka function ko humna const app ka naam sa assign kiya ha(library wala express ko ma na call krdia ha)

// var cors = require('cors')
import cors from "cors";




const app = express()
app.use(express.json())


app.use(cors())

//this is not allow in server this is for database just for understanding we do
var posts =[
  {text:"pakistan 0"}
  ,{text:"lahore 1"},{text: "islamabad 2"}
];

//--------get-------------
app.get('/post/:id', (req, res) => {

const id = Number(req.params.id);
  res.send(posts[id]);
})  //aik post ae gi

  app.get('/posts', (req, res) => {
  res.send(posts)
})     ///aik sa ziada posts ae gi

//----------post------------
app.post('/post', (req, res) => {
  //ab banda na mujha kuch bhja ha
  posts.push(req.body);
  res.send(`your post is save 😊❤ .Now we have ${posts.length} posts in our server`);
})

app.put('/post', (req, res) => {
  res.send()
})

app.delete('/post', (req, res) => {
  res.send()
})

// for assignment you have to do get or put on server
// cors npm
// https://www.npmjs.com/package/cors
// const port = 3000
const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})



// https://devcenter.heroku.com/articles/getting-started-with-nodejs