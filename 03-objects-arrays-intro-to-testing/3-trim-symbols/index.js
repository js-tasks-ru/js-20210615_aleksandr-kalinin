/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  const chars = string.split('');
  const arrString = [];
  let arrGroupChars = [];

  for (let i = 0; i < chars.length; i++) {
    const currentChar = chars[i];
    const nextChar = chars[i + 1];

    arrGroupChars.push(currentChar);

    if (currentChar !== nextChar) {
      arrString.push(
        arrGroupChars.slice(0, size).join('')
      );
      arrGroupChars = [];
    }
  }

  return arrString.join('');
}