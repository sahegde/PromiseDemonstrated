//Author Sandeep L Hegde
//sandeephegde1990@gmail.com

var express = require('express');
var Promise = require('promise');

var app = express();

function makeAnAsyncCall(resolve,reject) {
	setTimeout(function() {
		console.log("******************");
		resolve("common sandy");
	},2000);
}

function returnPromise() {
	return new Promise(function(resolve,reject) {
		makeAnAsyncCall(resolve,reject);
	});
}

app.get('/', function (req, res) {

	var allMsgs = '';

	console.log('Asynchronous request starts.');

	var step1 = function() {
		return returnPromise().then(function(data) {
		    console.log("step1 completed "+data);
		    allMsgs += "sandeep ";
		    return "pradeep ";
		});
	};

	var step2 = function(msg) {
		return returnPromise().then(function(data) {
		    console.log("step2 completed "+msg);
		    allMsgs += msg;
		    return "sumana ";
		});
	};

	var step3 = function(msg) {
		return returnPromise().then(function(data) {
		    console.log("step3 completed "+msg);
		    allMsgs += msg;
		    return "lakshmisha";
		});
	};

	step1().then(step2).then(step3).then(function(msg) {
		console.log("Inside final resolve callback "+msg);
		allMsgs += msg;

		console.log('Asynchronous request ends.');
		res.send(allMsgs);
	});

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});