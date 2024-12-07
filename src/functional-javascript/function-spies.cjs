module.exports = function createSpy(target, method) {
  const original = target[method];
  let count = 0;

  target[method] = function () {
    count++;
    original.apply(this, arguments);
  };

  return {
    get count() {
      return count;
    },
  };
};
