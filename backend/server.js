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
    done(); // release the client back to the pool
    });
  

//middleware

app.use((req, res, next) => {
    console.log("demo middleware...")

    next();
})


//const users must be there, otherwise big error
const users = [];

// Check credentials for database
passport.use(new BasicStrategy(
    function(username, password, done) {
        pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
            if (error) {
                throw error;
            }

            console.log(results.rows);

            if (results.rows.length > 0) {
                const user = results.rows[0];

                if (bcrypt.compareSync(password, user.password)) {
                    console.log(results.rows);
                    done(null, user);
                } else {
                    done(null, false);
                }
            } else {
                done(null, false);
            }
        });
    }
));


//JWT

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretKey"
}

//JWT 
passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done){
    /*console.log("JWT IS VALID");
    console.log("JWT PAYLOAD: ");
    console.log(jwt_payload);*/

    done(null, jwt_payload);
}))



// REQUEST BODY

app.post('/register', (req, res) => {
    // console.log(req.body);
 
    
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

    const secretKey = "secretKey";
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

let serverInstance = null;
module.exports = {
    start: function() {
        serverInstance = app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    },
    close: function() {
        serverInstance.close();
    }
}