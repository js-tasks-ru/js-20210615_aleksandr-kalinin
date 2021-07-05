/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arrPath = path.split('.');

  return (obj) => {
    if (!obj) {
      return undefined;
    }

    let objCopy = { ...obj };

    for (const key of arrPath) {
      if (objCopy[key] === undefined) {
        return undefined;
      }

      objCopy = objCopy[key];
    }

    return objCopy;
  };
}
