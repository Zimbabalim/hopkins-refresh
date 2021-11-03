const express = require("express");
const path = require("path");
const FE_DEV_SERVER_PORT = process.env.FE_DEV_SERVER_PORT || 3579;
const app = express();

app.listen(FE_DEV_SERVER_PORT, () => {
  console.log("\n*****************************");
  console.log("/app/ -RUNNING:", FE_DEV_SERVER_PORT);
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
