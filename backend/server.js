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

app.use(cors())

//node index.js to start server

//To connect to database (not tested because of IP problems)
/*const { Pool } = require('pg');
const pool = new Pool({
    user: 'dpg-cg80u01mbg53mc3cml2g-a.frankfurt-postgres.render.com',
    host: 'localhost',
    database: 'group1db',
    password: 'LEjCfIy7NtvcBrP2qB73lon1Z4IInvBM',
    port: 5432
});*/

//middleware

app.use((req, res, next) => {
    console.log("demo middleware...")

    next();
})


//Users with two test users hardcoded
const users = [
    {id: uuidv4(), username: 'test1', password: '1234'},
    {id: uuidv4(), username: 'test2', password: '4321'},
];

//Check Credentials
passport.use(new BasicStrategy(
    function(username, password, done) {

        //console.log('username'+username);
        //console.log('password'+password);

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

// Check credentials for database (NOT TESTED)
/*passport.use(new BasicStrategy(
    function(username, password, done) {
        pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
            if (error) {
                throw error;
            }

            console.log(results.rows);

            if (results.rows.length > 0) {
                const user = results.rows[0];

                if (bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } else {
                done(null, false);
            }
        });
    }
));*/

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
    console.log("passwordhash" + passwordHash);
    users.push({id: uuidv4(), username: req.body.username, password: passwordHash});
   // console.log("user pushed " + users)

    res.status(201).json({ status : "created"})
    

    //Database connection (not tested)
    /*pool.query('INSERT INTO users (id, username, password) VALUES ($1, $2, $3)', [uuidv4(), req.body.username, passwordHash], (error, results) => {
        if (error) {
            throw error;
        }

        console.log(users);

        res.send('OK');*/
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
    //console.log("TOKEN: " + generatedJWT);
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

//Port for server
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