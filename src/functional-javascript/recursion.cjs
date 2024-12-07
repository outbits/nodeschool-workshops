module.exports = function getDependencies(tree, result = []) {
  if (!tree || !tree.dependencies) {
    return [];
  }

  Object.keys(tree.dependencies).forEach((key) => {
    const dep = `${key}@${tree.dependencies[key].version}`;
    if (!result.includes(dep)) {
      result.push(dep);
    }
    getDependencies(tree.dependencies[key], result);
  });

  return result.sort();
};
