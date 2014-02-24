var vows = require("vows"),
    assert = require("assert"),
    fb = require("../");

const TIMES = 10;

function MockPrinter() {
    var self = this;
    self.called = [];

    self.write = function(message) {
        self.called.push(message);
    }
}

function setup() {
    var printer = new MockPrinter();
    return {
        printer: printer,
        fizzbuzz: new fb.FizzBuzz(printer)
    };
}

function getInput(multiple, test) {
    var res = [];
    while (res.length < TIMES) {
        var value = Math.floor(Math.random() * 100) * multiple;
        if (res.indexOf(value) == -1 && test(value))
            res.push(value);
    }
    return res;
}

function getInput3() {
    return getInput(3, function(v) { return v % 5 > 0; });
}

function getInput5() {
    return getInput(5, function(v) { return v % 3 > 0; });
}

function getInput15() {
    return getInput(15, function(v) { return true; });
}

function callWith(objects, inputs) {
    objects.input = inputs;
    for (var i = 0; i < objects.input.length; i++) {
        objects.fizzbuzz.print(objects.input[i]);
    }
    return objects;
}

assert.allAre = function(actuals, expected, input) {
    for (var i = 0; i < input.length; i++) {
        assert.isTrue(actuals[i] === expected,
            "fail for input #" + i +
            " with value " + input[i] +
            " got output " + actuals[i]);
    }
}

vows.describe("fizzbuzz").addBatch({
    "given a FizzBuzz controller": {
        topic: setup(),
        "when printing something": {
            topic: function(objects) {
                objects.fizzbuzz.print(7);
                return objects;
            },
            "the printer is called": function(objects) {
                assert.equal(objects.printer.called.length, 1);
            }
        },
    }
}).addBatch({
    "given a FizzBuzz controller": {
        topic: setup(),
        "when called with multiples of *3* (and not of 5)": {
            topic: function(objects) {
                return callWith(objects, getInput3());
            },
            "the printer is called once for each input": function(objects) {
                assert.equal(objects.printer.called.length, objects.input.length);
            },
            "the printer gets the word *Fizz* for each input": function(objects) {
                assert.allAre(objects.printer.called, "Fizz", objects.input);
            }
        }
    }
}).addBatch({
    "given a FizzBuzz controller": {
        topic: setup(),
        "when called with multiples of *5* (and not of 3)": {
            topic: function(objects) {
                return callWith(objects, getInput5());
            },
            "the printer is called once for each input": function(objects) {
                assert.equal(objects.printer.called.length, objects.input.length);
            },
            "the printer gets the word *Buzz* for each input": function(objects) {
                assert.allAre(objects.printer.called, "Buzz", objects.input);
            }
        }
    }
}).addBatch({
    "given a FizzBuzz controller": {
        topic: setup(),
        "when called with multiples of *3* and *5* (multiples of 15)": {
            topic: function(objects) {
                return callWith(objects, getInput15());
            },
            "the printer is called once for each input": function(objects) {
                assert.equal(objects.printer.called.length, objects.input.length);
            },
            "the printer gets the word *FizzBuzz* for each input": function(objects) {
                assert.allAre(objects.printer.called, "FizzBuzz", objects.input);
            }
        }
    }
}).export(module);
