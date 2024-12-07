module.exports = function curryN(fun, n) {
  if (n == undefined) {
    n = fun.length;
  }

  if (n - fun.length < 0) {
    throw new Error("cannot curry more times than the function's arity", {
      cause: { fnLength: fun.length, n },
    });
  }

  return function curry(arg) {
    if (n <= 1) {
      return fun(arg);
    }

    return curryN(fun.bind(this, arg), n - 1);
  };
};
