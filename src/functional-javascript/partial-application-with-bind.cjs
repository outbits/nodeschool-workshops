module.exports = function logger(namespace) {
  return console.log.bind(console, namespace);
};
