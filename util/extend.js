function extend(target) {
  if (typeof target !== 'object' || target === null) {
    throw new Error('extend: target must be an object');
  }

  var objs = Array.prototype.slice.call(arguments, 1);
  return objs.reduce(function (previous, obj) {
    Object.keys(obj).forEach(function (key) {
      previous[key] = obj[key];
    });
    return previous;
  }, target);
}

module.exports = extend;
