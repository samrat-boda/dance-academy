const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactdance", { useNewUrlParser: true });

const port = process.env.PORT ||8000;
// EXPRESS SPECIFIC STUFF

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  dec: String,
});
const contact = mongoose.model("contact", contactSchema);
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "/views")); // Set the views directory

//end points
app.get("/", (req, res) => { 
  res.status(200).render("home.pug");
});

app.get("/about", (req, res) => { 
  res.status(200).render("about.pug");
});

app.get("/contact", (req, res) => { 
  res.status(200).render("contact.pug");
});

app.get("/services", (req, res) => { 
  res.status(200).render("service.pug");
});
app.post("/contact", (req, res) => {
   
    var mydata = new contact(req.body);
    mydata.save().then(() => {
        res.send("This data has been saved to the database")
    }).catch(()=> {
        res.status(404).send("This data has not been saved to the database");
    })
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
