module.exports = FizzBuzz;

function FizzBuzz(printer) {
    var self = this;

    self.print = function(i) {
        if (i % 3 == 0) {
            printer.write("Fizz");
        } else if (i % 5 == 0) {
            printer.write("Buzz");
        } else {
            printer.write(i);
        }
    }
}
