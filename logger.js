/* Logger Class */

'use strict'

function message(messageToLog) {
  console.log(`${new Date()} - ${messageToLog}`);
}

exports.message = message;
