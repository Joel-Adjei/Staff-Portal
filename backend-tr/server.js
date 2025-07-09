// backend/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 1972; // As specified in the requirements

const TStaffUsers = [
    {firstName: "Joel", lastName: "Adjei" , userEmail : "kofienergy15@gmail.com" , password :"password" , role :"teaching-staff"}
]
const adminUsers = [
    {firstName: "Ronney", lastName: "Apreku", userEmail : "rooney@gmail.com" , password :"password" , role :"non-teach-staff"}
]
const nonTStaffUsers = [
    {firstName: "Amos", lastName: "Gyasi" , userEmail : "admin1@gmail.com" , password : "223334" , role :"admin"}
]

app.use(cors())
app.use(express.json())

app.post('/api/auth/login' , (req , res)=>{
    const userEmail = req.body.email;
    const password = req.body.password;
    const role = req.body.role

    let databaseToSearch = TStaffUsers;

    if(role === "admin"){
        databaseToSearch = adminUsers;
    }else if(role === "staff"){
        databaseToSearch = TStaffUsers
    }else if(role === "non-teaching-staff") {
        databaseToSearch = nonTStaffUsers;
    }

    const user = databaseToSearch.find((user)=> user.userEmail === userEmail && user.password === password)
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

export default app


