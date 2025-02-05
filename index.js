const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

const USERS = [];

const QUESTIONS = [{
  title: "Two states",
  description: "Given an array , return the maximum of the array?",
  testCases: [{
    input: "[1,2,3,4,5]",
    output: "5"
  }]
}];


const SUBMISSIONS = [

]

app.post('/signup', function (req, res) {
  // Add logic to decode body
  // body should have email and password


  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)


  // return back 200 status code to the client
  const { email, password } = req.body;
  console.log(email, password);
  const userExists = USERS.find(user => user.email === email);

  if (userExists) {
    res.status(400).send("User already exists");
  }

  USERS.push({ email, password });

  res.status(200).send("User created successfully");
  console.log(USERS);
})

app.post('/login', function (req, res) {
  // Add logic to decode body
  // body should have email and password

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same


  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  const { email, password } = req.body;

  const user = USERS.find(user => user.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check if the password is correct
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  console.log(USERS);


  res.send('Login successful')
})

app.get('/questions', function (req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send(QUESTIONS)
})

app.get("/submissions", function (req, res) {
  // return the users submissions for this problem
  res.send(SUBMISSIONS)
});


app.post("/submissions", function (req, res) {
  // let the user submit a problem, randomly accept or reject the solution
  // Store the submission in the SUBMISSION array above
  const { problem, submission } = req.body

  answer = Math.random()

  if (answer === 0) {
    accepted = true
  } else {
    accepted = false
  }

  SUBMISSIONS.push({ problem, submission, accepted })

  res.status(200).send({ status: accepted ? "accepted" : "rejected" })
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})