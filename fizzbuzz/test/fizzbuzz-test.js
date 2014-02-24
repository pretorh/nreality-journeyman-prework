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
                objects.input = getInput3();
                for (var i = 0; i < TIMES; i++) {
                    objects.fizzbuzz.print(objects.input[i]);
                }
                return objects;
            },
            "the printer is called once for each input": function(objects) {
                assert.equal(objects.printer.called.length, objects.input.length);
            },
            "the printer gets the word *Fizz* for each input": function(objects) {
                for (var i = 0; i < objects.input.length; i++) {
                    assert.equal(objects.printer.called[i], "Fizz",
                        "fail for input #" + i +
                        " with value " + objects.input[i] +
                        " got output " + objects.printer.called[i]);
                }
            }
        }
    }
}).export(module);
