const express = require("express");
const Podlet = require("@podium/podlet");
const fs = require("fs");

const app = express();

// Basic definition of the podlet
const podlet = new Podlet({
  name: "reactMessagePod", // required
  version: "0.1.0", // required
  pathname: "/", // required
  manifest: "/manifest.json", // optional, defaults to '/manifest.json'
  development: true, // optional, defaults to false
});

// Read the asset manifest using the node filesystem
let rawdata = fs.readFileSync("build/asset-manifest.json");
let assets = JSON.parse(rawdata);

// All entrypoint files css and js should be added to the podlet definition.
// These static files should be in a CDN and the file location should change according to the environment...
// If the static files are in a CDN, then there is no need to put the podlet public (in an online environment).
// For demonstration purposes, the files are served through the podlet process.
assets.entrypoints.forEach((element, index) => {
  if (element.indexOf(".css") !== -1) {
    podlet.css({ value: "http://localhost:7100/" + element });
  } else if (element.indexOf(".js") !== -1) {
    podlet.js({ value: "http://localhost:7100/" + element, defer: true });
  }
});

// apply middleware
app.use(podlet.middleware());

// static files
// if there are other directories with static files
// such as images in the public directory... add them in a similar way
// However, a CDN is the preferred way to deliver static files.
app.use("/static", express.static("build/static"));

// add HTML to send. This is the div ID in public/index.html
app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend('<div id="react-message"></div>');
});

// generate the podlet manifest
app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

//start the app at port 7100
app.listen(7100);
