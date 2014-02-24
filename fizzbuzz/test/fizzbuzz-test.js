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
        "when called with multiples of *3*": {
            topic: function(objects) {
                objects.input = [];
                for (var i = 0; i < TIMES; i++) {
                    var value = Math.floor(Math.random() * 100) * 3;
                    objects.input.push(value);
                    objects.fizzbuzz.print(value);
                }
                return objects;
            },
            "print is called once for each input": function(objects) {
                assert.equal(objects.printer.called.length, objects.input.length);
            },
            "print gets the word *Fizz* for each input": function(objects) {
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
