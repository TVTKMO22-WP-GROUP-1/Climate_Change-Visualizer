const express = require('express');
const app = express();
const port = 5000;
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

//node index.js to start server

//To connect to database 
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgres://group1db_user:LEjCfIy7NtvcBrP2qB73lon1Z4IInvBM@dpg-cg80u01mbg53mc3cml2g-a.frankfurt-postgres.render.com/group1db?ssl=true',

});

pool.connect((err, client, done) => {
    if (err) throw err;
    console.log('Connected to PostgreSQL database!');
  
    client.query('SELECT username FROM users', (err, result) => {
      if (err) throw err;
      console.log(result.rows.map(row => row.username));
      done(); // release the client back to the pool
    });
  });
    
   

//middleware

app.use((req, res, next) => {
    console.log("demo middleware...")

    next();
})
//const users must be there, otherwise big error
const users = [];
passport.use(new BasicStrategy(
    function(username, password, done) {
        const user = users.find(u => u.username === username);
        if (user != null) {
            
            if(bcrypt.compareSync(password, user.password)){
                done(null, user);
            } else {
                done(null, false);
            }
        } else {
            done(null, false);
        }

    }
));
//JWT
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretKey"
}

//JWT 
passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done){
    done(null, jwt_payload);
}))
// REQUEST BODY
app.post('/register', (req, res) => {
     if('username' in req.body == false){
         res.status(400);
         res.json({status: "missing username"})
         return;
     }
 
     if('password' in req.body == false){
         res.status(400);
         res.json({status: "missing password"})
         return;
     }
     //hash the password
     const salt = bcrypt.genSaltSync(6);
     const passwordHash = bcrypt.hashSync(req.body.password, salt);
     //console.log("passwordhash" + passwordHash);
     const id = uuidv4();
     users.push({id: id, username: req.body.username, password: passwordHash});
    // console.log("user pushed " + users)
 
    pool.query("INSERT INTO users (id, username, password) VALUES ($1,$2,$3)",
 [id, req.body.username, passwordHash],
  (err, result)=> {
    console.log(err);
 })
     res.status(201).json({ status : "created"})
 });
 app.get('/my-protected-resource', passport.authenticate('basic',{session: false}),(req, res) => {
     console.log("Protected resource accessed");
 
     res.send('This is a protected resource');
     })

//JWT login
app.post('/jwtLogin', passport.authenticate('basic',{session: false}), (req, res) => {
    //console.log(req);
    const payload = {
        user : {
            id: req.user.id,
            username: req.user.username
        }
    };

    let secretKey = process.env.JWT_SECRET_KEY;
    console.log("JWT_SECRET_KEY is " + secretKey);
    if (!secretKey) {
        console.warn("JWT_SECRET_KEY environment variable is not set. Using default value.");
        const defaultSecretKey = "mysecretkey";
        secretKey = defaultSecretKey;
      };
    const options = {
        expiresIn: '1d'//expires in 1 day
    };
    const generatedJWT = jwt.sign(payload, secretKey, options)
    res.json({jwt : generatedJWT })
})

app.delete('/deleteuser', passport.authenticate('basic',{session: false}) ,(req, res) => {
    console.log(req.body);
     if('username' in req.body == false){
         res.status(400);
         res.json({status: "missing username"})
         return;
     }
 
     if('password' in req.body == false){
         res.status(400);
         res.json({status: "missing password"})
         return;
     }

     users.delete({username: req.body.username, password: req.body.password});
     res.status(201).json({ status : "deleted"})
 });

app.get('/jwt-protected-resource', passport.authenticate('jwt',{session: false}), (req, res) => {
    //console.log(req.user);

    console.log('User Id from JWT is ' + req.user.user.id);
    res.send("OK, for user " + req.user.user.username); 
})

app.get('/users',(req,res) => {
    pool.query('SELECT * FROM users',(error,results) =>{
        if (error) {
            console.error(error);
          } else {
            const values = JSON.stringify(results.rows)
            res.send({ values }); 
          }
    })
})
app.delete('/users/:username', (req, res) => {
    const username = req.params.username;
    //console.log(username);
    pool.query('DELETE FROM users WHERE username = $1', [username], (error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Deleted user with username ${username}`);
            res.status(201).json({ status : "deleted"})
        }
    })

  });

let serverInstance = null;
module.exports = {
    start: function() {
        serverInstance = app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        })
    },
    close: function() {
        serverInstance.close();
    }

    
}
