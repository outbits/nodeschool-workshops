module.exports = function reduce(arr, fn, initial) {
  return accumulate(initial, 0);

  function accumulate(accumulator, currentIdx) {
    if (currentIdx >= arr.length) {
      return accumulator;
    }

    return accumulate(
      fn(accumulator, arr[currentIdx], currentIdx, arr),
      currentIdx + 1,
    );
  }
};
