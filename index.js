
// needed imports
const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session');
const cel = require('connect-ensure-login');
const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid').v4;

// this is a list of dummy users, you can add some here, this should be changed for a database
const users = [
    { id: 0, email: 'test@test.com', password: '123' },
    { id: 1, email: 'test2@test.com', password: '123' }
]

const SECRET = 'SECRET'; // a secret var that should be very long and set in environment variables (SwBuwJHf54OBIldxFV6e7iJk69RYMI13tovgzlQCuXOtnSZYJ5OeiaVHOp7AKmIK5dAJe4wFE1g4NkPfVOGnQH7qpyZzlJ02YuZa4lEogEmEH0e5joBpo4d88GpdviyV for example)
const COOKIE_NAME = 'test.cookie';

const app = express(); // we create the app
app.use(bodyParser.json()) // we add the json parser

// we init express-session by cookies here !!!
app.use(session({
    name: COOKIE_NAME, // optional; if not provided, cookie name would be connect.sid
    genid: (req) => {
        /**
         * If there was no session created, we come here to create a session.
         * if session is already created, we won't come here again.
         */
        console.log('Session middleware', req.sessionID); // this gives the number of the session
        return uuid() // use UUID's for session id
    },
    // store: new FileStore(), // creates a session folder and stores the session file in it
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}));

// passport use local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' }, // passport uses username and password authenticate user, however our app uses email, we alias it here
    (email, password, done) => {
        console.log('Inside local strategy callback' , email , password);
        // here we can make a call to DB to find the user based on username, password.
        // for now, lets use the hardcode ones
        const user = users.find(user => user.email === email);
        console.log('user found : ' , user);

        if(!user) {
            return;
        }

    if (email === user.email && password === user.password) {
        // return done(null, jwt.encode({ user }, SECRET))
        return done(null, user)
    }

    done(null, false)
}));

// passport serialize and deserialize
passport.serializeUser((user, done) => {
    console.log('Inside serialise cb. User id is stored to the session file store here')
    done(null, user.id) // store the user.id into session
})

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(`The user id passport saved in the session file store is: ${id}`)
    // const user = users[0].id === id ? users[0] : false;
    const user = users[id];
    done(null, user);
})

// tell application to use passport as middleware, configure these only after express-session and session-file-store
app.use(passport.initialize());
app.use(passport.session());

// mounting endpoints !!!
app.get('/', (req, res) => res.sendFile('home.html' , {root: '.'})); // home endpoint (get)
app.post(
    '/login',
    passport.authenticate('local' , { successReturnToOrRedirect: '/authrequired', failureRedirect: '/login' }), // USE OF PASSPORT HERE
    (req, res) => {
    const user = req.user
    const token = jwt.encode({ user }, SECRET)
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    res.send({
        token: token,
        message: "successfully logged in"
    })
})

app.get('/login' , (req, res) => {
    if(req.user) {
        res.redirect('/authrequired');
    } else {
        res.sendFile('login-page.html' , {root: '.'});
    }
})

app.get('/logout' , (req,res) => {
    console.log(JSON.stringify(req.user) + ' logout') // add event in logs
    req.logOut(); // log out
    res.redirect('/'); // redirect home
});

// authorised endpoint. Must be logged into access this endpoint
// this is where we use connect-ensure-login !
app.get(
    '/authrequired',
    cel.ensureLoggedIn('/login'), // CONNECT ENSURE LOGIN => if not authenticated, user is sent back to login page (get login)
    function(req, res) {
      res.send({user: req.user});
    }
);

app.listen(3000, () => console.log('Listening on port 3000')); // START THE APP and listen on port 3000
