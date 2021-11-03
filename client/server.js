const express = require("express");
const path = require("path");
const CLIENT_PORT = process.env.CLIENT_PORT || 3579;
const app = express();

app.listen(CLIENT_PORT, () => {
  console.log("\n*****************************");
  console.log("/app/ -RUNNING:", CLIENT_PORT);
  console.log("*****************************\n");
});

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function( req, res ){
  console.log("***************************");
  console.log("NEW SESSION", new Date() );
  console.log("***************************");
  
  // sessionLogPrettyMeta.index = 1;
  // setColour();
  
  res.render('public/index.html');
});
