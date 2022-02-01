const express = require("express");
const app = express();
    
require("./config/mongoose.config");
    
app.use(express.json(), express.urlencoded({ extended: true }));
    
// app.use(require("./routes/food.routes"));
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));