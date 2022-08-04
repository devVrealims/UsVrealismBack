# UsVrealismBack
A Nodejs backend that , received all the queries from App2Plan

Installation of Back2Plan

Back2Plan use a MYSQL , make a DB and name it users
Create a NODEJS project npm init y into a server directrory
Dependencies Installation

npm i --global body-parser
npm i --global cors
npm i --global express
npm i --global https
npm i --global mysql
npm i --global pm2
Clone the index.js from the repository on root project or server directory

Then , let´s make a static proccess to make enable a server with PM2

Change for the server directory and type.

pm2 start index.js --name crud

This command make the server online forever , and PM2 Commands help like monitor proccess.
