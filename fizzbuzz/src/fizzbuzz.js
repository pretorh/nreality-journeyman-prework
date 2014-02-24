module.exports = FizzBuzz;

function FizzBuzz(printer) {
    var self = this;

    self.print = function(i) {
        if (i % 3 == 0) {
            printer.write("Fizz");
        } else {
            printer.write(i);
        }
    }
}
