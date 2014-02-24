module.exports = FizzBuzz;

function FizzBuzz(printer) {
    var self = this;

    self.print = function(i) {
        printer.write(i);
    }
}
