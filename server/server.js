const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require('cors');
connectDb();
const app = express();
const port = process.env.PORT;


app.use(cors());
//middleware to parse req body to json
app.use(express.json());
//middleware app.use(to direct request to root /api/contact)
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
//use errorhandler middleware
app.use(errorHandler);




app.listen(port, () => {
    console.log(`server running on port ${port}`)
})