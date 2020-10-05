# Very Quick Start
## type > "npm i && node ."

1. type *npm i* from root in command line to install everything
2. type *node .* to launch the server on port 3000
   1. home -> http://localhost:3000
   2. login -> http://localhost:3000/login
   3. auth required -> http://localhost:3000/authrequired
   4. logout -> http://localhost:3000/logout

# Steps for creation of this repo

1. npm init (create project)
2. npm i --save express body-parser passport passport-local connect-ensure-login express-session uuid 
3. create index.js
4. create home page and login page
5. see comments in index.js & html pages for next steps
   1. config of express-session : lines 24 -> 38
   2. config of passport with local strategy : lines 41 -> 78
   3. mounting endpoints : lines 80 -> 110
   4. connect ensure login : line 110