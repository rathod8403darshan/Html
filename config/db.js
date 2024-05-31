const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://brightlight:brightlight123@cluster0.xvzbdyg.mongodb.net/users')
.then(()=>console.log("db connected!"));