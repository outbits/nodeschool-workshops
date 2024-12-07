module.exports = function () {
  return Array.prototype.filter.call(
    arguments,
    // nowadays the prefered way is to use Object.hasOwn(obj, propName)
    (arg) => Object.prototype.hasOwnProperty.call(arg, "quack"),
  ).length;
};
