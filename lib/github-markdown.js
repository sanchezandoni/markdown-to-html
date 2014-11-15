'use strict';
// Converts a markdown file into an HTML file, writing it to stdout.
// Uses the github API, so it outputs exactly what you will see on github.
//
// Usage:
//   node format_markdown <filename> <context> <github user id>
//
var request = require('request');
var fs = require('fs');

var fileName = process.argv[2];
var context = process.argv[3] || 'cwjohan/node-redis-queue';
var userName = process.argv[4] || 'cwjohan'

if (! fileName) {
  console.log('Missing file name arg');
  process.exit();
}

var fileContent = fs.readFileSync(fileName).toString();

var msg = {
  text: fileContent,
  mode: 'gfm',
  context: context
};

var jsonMsg = JSON.stringify(msg);

var options = {
  method: 'POST',
  preambleCRLF: true,
  postambleCRLF: true,
  uri: 'https://api.github.com/markdown',
  'content-type': 'application/json',
  headers: {
    'User-Agent' : userName
  },
  body: jsonMsg
};

function handleResponse(error, response, body) {
  if (error) {
    return console.error('upload failed:', error);
  }
  console.log(body);
}

request(options, handleResponse);
