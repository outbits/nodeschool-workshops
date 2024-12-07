function repeat(operation, num) {
  return function executeRepeat() {
    if (num <= 0) return;
    operation();
    return repeat(operation, num - 1);
  };
}

function trampoline(fn) {
  while (typeof fn === "function") {
    fn = fn();
  }
}

module.exports = function (operation, num) {
  return trampoline(() => repeat(operation, num));
};
