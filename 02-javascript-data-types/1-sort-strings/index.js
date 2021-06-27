/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const arrCopy = [...arr];
  const sortingTypeOrder = param === 'desc' ? -1 : 1;

  arrCopy.sort((a, b) => {
    return a.localeCompare(b, ['ru-RU', 'en-GB'], { caseFirst: 'upper' }) * sortingTypeOrder;
  });

  return arrCopy;
}
