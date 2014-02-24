var vows = require("vows"),
    assert = require("assert"),
    fb = require("../");

function MockPrinter() {
    var self = this;
    self.called = [];

    self.write = function(message) {
        self.called.push(message);
    }
}

vows.describe("fizzbuzz").addBatch({
    "given a FizzBuzz controller": {
        topic: function() {
            var printer = new MockPrinter();
            return {
                printer: printer,
                fizzbuzz: new fb.FizzBuzz(printer)
            };
        },
        "when printing something": {
            topic: function(objects) {
                objects.fizzbuzz.print(7);
                return objects;
            },
            "the printer is called": function(objects) {
                assert.equal(objects.printer.called.length, 1);
            }
        }
    }
}).export(module);
