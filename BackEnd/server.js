const express = require("express"),
  redirect = require("express-redirect");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const Joi = require("joi");
const assert = require("assert");
const app = express();
redirect(app);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
var session = require("express-session");
var cookieParser = require("cookie-parser");

//brad traversy

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);
// Passport init
app.use(passport.initialize());
app.use(passport.session());

const mongo_url = "mongodb://localhost:27017";
const database = "Scrum";
//let contact = [];
MongoClient.connect(
  mongo_url,
  (err, client) => {
    assert.equal(err, null, "database connexion failed");
    const db = client.db(database);
    //postSignUp
    app.post("/addUser", (req, res) => {
      if (req.body.password == req.body.confirmpassword) {
        /* const { error } = validateUser(req.body);
        if (error) res.status(400).send(error.details.message);
        else {*/
        console.log(req.body);
        db.collection("user").insertOne(req.body, (err, data) => {
          if (err) console.log("insert failed");
          else res.send(data);
        });
      } else {
        alert("passowrd isn't the same");
      }
    });
    //postLogin
    //post
    app.post("/authentify", (req, res) => {
      db.collection("user").findOne(
        { fullname: req.body.fullname, password: req.body.password },
        (err, data) => {
          if (err) console.log("get failed");
          else {
            if (data == null) res.status(404).send("user not found");
            else if (
              data.fullname == req.body.fullname &&
              data.password == req.body.password
            ) {
              alert("login succeed");
              res.send(data);
            } else {
              alert("passowrd isn't the same");
            }
          }
        }
      );
    });
    //postproject
    app.post("/new_project", (req, res) => {
      db.collection("projects").insertOne(req.body, (err, data) => {
        if (err) console.log("insert failed");
        else res.send(data);
      });
    });
    //getlistproject
    app.get("/listProject", (req, res) => {
      db.collection("projects")
        .find()
        .toArray((err, data) => {
          if (err) console.log("get failed");
          else res.send(data);
        });
    });
    //putProject
    app.put("/updateproject/:id", (req, res) => {
      let modifiedProject = req.body;
      let id = ObjectID(req.params.id);
      db.collection("projects").findOneAndReplace(
        { _id: id },
        { $set: { ...modifiedProject } },
        (err, data) => {
          if (err) res.send("update failed");
          else res.send("project was modified");
        }
      );
    });

    app.get("/projects/:id", (req, res) => {
      db.collection("projects").findOne(
        { _id: ObjectID(req.params.id) },
        (err, data) => {
          if (err) console.log("get failed");
          else {
            if (data == null) res.status(404).send("project not found");
            else res.send(data);
          }
        }
      );
    });

    //delete project
    app.delete("/deleteProject/:id", (req, res) => {
      let id = ObjectID(req.params.id);
      db.collection("projects").findOneAndDelete({ _id: id }, (err, data) => {
        if (err) res.send("can't delete project");
        else {
          if (data.value == null) {
            res.status(404).send("project not found");
          } else {
            res.send("project was deleted");
          }
        }
      });
    });

    /*// Using LocalStrategy with passport
    var LocalStrategy = require("passport-local").Strategy;
    passport.use(
      new LocalStrategy(function(fullname, password, done) {
        db.collection("user").findOne(
          { fullname: fullname, password: password },
          function(username, password, done) {
            return done(null, false, { message: "Unable to login" });
          }
        );
      })
    );

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.getUserById(id, function(err, user) {
        done(err, user);
      });
    });
    // Endpoint to login
    app.post(
      "/authentify",
      passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login"
      }),
      function(req, res) {
        res.send(req);
      }
    );
 */
    //post sprint
    app.post("/addSprint", (req, res) => {
      db.collection("sprint").insertOne(req.body, (err, data) => {
        if (err) console.log("insert failed");
        else res.send(data);
      });
    });
    //get team
    app.get("/team", (req, res) => {
      db.collection("user")
        .find({ status: { $in: ["designer", "developer","tester"] } })
        .toArray((err, data) => {
          if (err) console.log("get failed");
          else res.send(data);
        });
    });
  }
);

function validateUser(user) {
  const schema = Joi.object().keys({
    fullname: Joi.string()
      .alphanum()
      .min(6)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),

    status: Joi.string()
      .min(5)
      .max(60)
      .required(),
    password: Joi.string()
      .min(6)
      .max(10)
      .required(),
    confirmpassword: Joi.string()
      .min(6)
      .max(10)
      .required(),
    photo: Joi.object({
      "content-disposition": Joi.string().required(),
      "content-type": Joi.string()
        .valid(["image/jpeg"])
        .required()
    }).required(),
    photo: Joi.string().required()
  });
  return Joi.validate(user, schema);
}

app.listen(5005, err => {
  if (err) console.log("server connexion failed");
  else console.log("server connecting on port 5005");
});
