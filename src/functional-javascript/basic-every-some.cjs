module.exports = function checkUsersValid(goodUsers) {
  return function allUsersValid(suppliedUsers) {
    return suppliedUsers.every(function isGoodUser(user) {
      return goodUsers.some(({ id }) => user.id === id);
    });
  };
};
