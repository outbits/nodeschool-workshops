module.exports = function logger(namespace) {
  return function log() {
    console.log.apply(
      console,
      // avoided using Array.prototype.unshift.call(arguments, namespace)
      // to keep it "functional" following the spirit of the workshop
      [namespace].concat(Array.prototype.slice.call(arguments)),
    );
  };
};
