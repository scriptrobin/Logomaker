const mongoose = require('mongoose');
require('./user.modals');
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology:true },  (err) => {
    if(!err) {
        console.log("MangoDB connection succeeded")
    }
    else {
        console.log("Error in MangoDB: "+ JSON.stringify(err, undefined, 2));
    }
});