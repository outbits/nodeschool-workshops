module.exports = function arrayMap(input, operation, thisArg) {
  if (thisArg) {
    operation = operation.bind(thisArg);
  }

  return input.reduce(function accumulate(acc, curr, index, arr) {
    acc.push(operation(curr, index, arr));
    return acc;
  }, []);
};
