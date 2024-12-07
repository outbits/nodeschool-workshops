module.exports = function loadUsers(userIds, load, done) {
  var users = [];

  userIds.forEach((userId, idx) => {
    load(userId, function handleUserRetrieval(user) {
      users[idx] = user; // user | undefined. maintains sort

      if (users.length == userIds.length) {
        done(users);
      }
    });
  });
};
