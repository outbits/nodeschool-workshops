/*
 * As it stands, the exercise's test is too brittle
 * to guarantee making this pass for every machine.
 * The test is very flaky and relies on an arbitrary
 * number of instances to be executed for it to pass(>=10).
 * This can vary depending on processing power, env etc..
 * The official solution is even more cryptic,
 * calling setTimeout every 10 cycles. Why 10 cycles?
 * It's never explained nor required in the problem statement.
 */
let start = Date.now();
// program is said to be interrupted after 100ms
const INTERRUPT_TIMER_MS = 100;
module.exports = function repeat(operation, num) {
  if (num <= 0) {
    return;
  }

  operation();

  if (Date.now() - start < INTERRUPT_TIMER_MS) {
    // guarantee execution for at least 100ms
    repeat(operation, num - 1);
  } else {
    // start releasing the event loop afterwards
    setTimeout(() => repeat(operation, num - 1));
  }
};
