var vows = require("vows"),
    assert = require("assert"),
    fb = require("../");

vows.describe("fizzbuzz").addBatch({
    "given a FizzBuzz controller": {
        topic: new fb.FizzBuzz(),
        "the controller is initialized": function(fizzbuzz) {
            assert.isNotNull(fizzbuzz);
        }
    }
}).export(module);
