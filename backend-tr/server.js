// backend/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 1972; // As specified in the requirements

const users = [
    {name: "Joel Adjei" , userEmail : "kofienergy15@gmail.com" , password : "password"}
]

app.use(cors())
app.use(express.json())

app.post('/api/auth/login' , (req , res)=>{
    const userEmail = req.body.email;
    const password = req.body.password;

    const user = users.find((user)=> user.userEmail === userEmail && user.password === password)
    if(user){
        //Generate web token
        const token = jwt.sign({useremail : user.userEmail}, "THEKEY");
        res.json({success: true , token : token , message: "auth successfull" , data : user})
    }else{
        //response not a user
        res.json({success: false , message: "user not found"})
    }
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

