#!/usr/bin/node

var fb = require("./");
var fizzbuzz = new fb.FizzBuzz({ write: function(a) { console.log(a); } });
for (var i = 1; i <= 100; i++) {
    fizzbuzz.print(i);
}
