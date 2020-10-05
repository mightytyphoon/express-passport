# Very Quick Start
### type : "npm run i" to install & run app directly

# Quick Start
1. type *npm i* or *npm run install* from root in command line to install everything
2. type *node .* or *npm run start* to launch the server on port 3000 
   * home -> http://localhost:3000
   * login -> http://localhost:3000/login
   * auth required -> http://localhost:3000/authrequired
   * logout -> http://localhost:3000/logout

# Steps for creation of this repo
1. npm init (create project)
2. npm i --save express body-parser passport passport-local connect-ensure-login express-session uuid 
3. create index.js
4. create home page and login page
5. see comments in index.js & html pages for next steps
   * config of express-session : lines 24 -> 38
   * config of passport with local strategy : lines 41 -> 78
   * mounting endpoints : lines 80 -> 110
   * connect ensure login : line 110

# Donate
if you want to support the creator : [Donate with PayPal](https://www.paypal.com/donate/?cmd=_donations&business=VA8UVVE26BDPJ&currency_code=EUR). 
