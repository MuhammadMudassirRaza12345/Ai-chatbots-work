// import express from library express(yani library ka ander jo express ka function honga wo used kraga hum)
import express from 'express'
// express ka function ko humna const app ka naam sa assign kiya ha(library wala express ko ma na call krdia ha)
import cors from "cors";
// cors is used to allow server permission
const app = express()
app.use(express.json())
// // cors code
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))
// // cors code end

app.use(cors());  //  allow all origins, not recommended in production


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

// app.put('/post', (req, res) => {
//   res.send()
// })
app.put('/post/:id', (req, res) => {
  const id = Number(req.params.id);
  posts[id] = req.body;
  res.send(posts[id])
})
app.delete('/post/:id', (req, res) => {
  const id = Number(req.params.id);
  delete posts[id];
  res.send("deleted")
})

app.delete('/posts', (req, res) => {
  posts = [];
  res.send("deleted everything")
})

// app.delete('/post', (req, res) => {
//   res.send()
// })




// const port = 3000
const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

// cors npm
// https://www.npmjs.com/package/cors

// https://devcenter.heroku.com/articles/getting-started-with-nodejs