'use strict';

const httpCall = require('http')
const express = require('express');
const {
  createLightship
} = require('lightship');

const lightship = createLightship();

var CryptoJS = require("crypto-js");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Health Check Endpoint
const app = express();

app.get('/api/health', (req, res) => {
  res.sendStatus(200);
});

// Encryption Endpoint
app.get('/api/encrypt/:stringToEncrypt', (req, res) => {
  //if(error){
    //res.status(500).end(stringifyFailedValueToRetrieve("Something went wrong: " + error));
  //}
  res.setHeader('Content-Type', 'application/json');
  var input = req.params.stringToEncrypt;
  if(!validateInput(input)){
    res.status(422).end(stringifyFailedValueToRetrieve(input, "Input is not a string"));
  }
  var result = encrypt(input);
  res.status(200).end(stringifySuccessfulValueToRetrieve(input,result));
});

// Decryption Endpoint
app.get('/api/decrypt/:stringToDecrypt', (req, res) => {
  //if(error){
    //res.status(500).end(stringifyFailedValueToRetrieve("Something went wrong: " + error));
  //}
  res.setHeader('Content-Type', 'application/json');
  var input = req.params.stringToDecrypt;
  if(!validateInput(input)){
    res.status(422).end(stringifyFailedValueToRetrieve(input, "Input is not a string"));
  }
  var result = decrypt(input);
  res.status(200).end(stringifySuccessfulValueToRetrieve(input,result));
});

//app.get('/*', function (req, res) {
//  res.sendStatus(404);
//})

// Encryption Function Implementation
function encrypt(string){
  var myPassword = "FixedPassword";
  var result = CryptoJS.AES.encrypt(string, myPassword).toString();
  return result;
}

// Decryption Function Implementation
function decrypt(string){
  var myPassword = "FixedPassword";
  var result = CryptoJS.AES.decrypt(string, myPassword).toString(CryptoJS.enc.Utf8);
  return result;
}

// Format successful response message to be wrapped in JSON
function stringifySuccessfulValueToRetrieve(input, output){
  return JSON.stringify({
    "Input": input,
    "Output": output, 
    "Status": "success", 
    "Message": ""
  }, null, 3);
}

// Format failed response message to be wrapped in JSON
function stringifyFailedValueToRetrieve(input, error){
  return JSON.stringify({
    "Input": input,
    "Output": "", 
    "Status": "error", 
    "Message": error
  }, null, 3);
}

// Format failed response message to be wrapped in JSON
function stringifyFailedValueToRetrieve(error){
  return JSON.stringify({
    "Input": "",
    "Output": "", 
    "Status": "error", 
    "Message": error
  }, null, 3);
}

// Validate input is a string
function validateInput(input){
  return typeof input === 'string' || input instanceof String;
}


// Enable Health Check Status Change when app starts running
app.listen(PORT, HOST, () => {
  lightship.signalReady();
});

console.log(`Running on http://${HOST}:${PORT}`);