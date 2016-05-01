/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
/*global */
/*
* Author: Jeffry Hesse 
* Copyright (c) 2016.
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//Load Grove Motion module
var grove_motion = require('jsupm_biss0001');

// load child process to play sound
var child = require('child_process');

// Instantiate a Grove Motion sensor on GPIO pin D2
var myMotionObj = new grove_motion.BISS0001(2);

// variable to keep track if sound is playing or not
var soundOn = false;

setInterval(function()
{
	if (myMotionObj.value() && !soundOn) {
		console.log("These pretzels are making me thirsty...");
        var cmd = 'gst-launch-1.0';
        var args = ['filesrc', 'location=/tmp/seinfeld.wav', '!', 'wavparse', '!', 'pulsesink'];
        var options = null;
        var gstMuxer = child.spawn(cmd, args, options);
        soundOn = true;
        gstMuxer.stderr.on('data', onSpawnError);
        gstMuxer.on('exit', onSpawnExit);
    }
	else {
		console.log("JERRY!");
    }
}, 1000);

function onSpawnError(data) {
    console.log(data.toString());
}

function onSpawnExit(code) {
    soundOn = false;
    if (code != null || code != 0) {
        console.error('GStreamer error, exit code ' + code);
    }
}

// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});
