// @flow important: 空字符串不要留空格！相关代码中没有 replace 处理！
const KEYBOARD =
  [
    [['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+']],
    [['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'], ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}']],
    [['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'], ['k', 'K'], ['l', 'L'], [';', ':'], ["'", '"'], ['', '']],
    [['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?'], ['', ''], ['', '']],
  ];

/**
 *
 * @param {string} str
 * @param {number} threshold
 * @returns {boolean}
 */
export default function keyboard(str: string, threshold: number = 4): boolean {
  if (!str) {
    return false;
  }
  if (threshold < 2) {
    threshold = 2;
  }
  if (threshold > 4) {
    threshold = 4
  }
  let _regExp = [];
  for (let listIndex = 0; listIndex < KEYBOARD.length; listIndex++) {
    for (let rowIndex = 0; rowIndex < KEYBOARD[listIndex].length; rowIndex++) {
      let _rowRegItem = [];
      let _listItem = [];

      if (rowIndex <= KEYBOARD[listIndex].length - threshold) {
        //row : [1!][2@][3#][4$]
        for (let index = 0; index < threshold; index++) {
          _rowRegItem.push(`[${KEYBOARD[listIndex][rowIndex + index].join('')}]`);
        }
      }
      if (listIndex <= KEYBOARD.length - threshold) {
        //list :[1!][qQ][aA][zZ]
        for (let index = 0; index < threshold; index++) {
          _listItem.push(`[${KEYBOARD[listIndex + index][rowIndex].join('')}]`);
        }
      }

      _regExp = _regExp.concat(_rowRegItem.join(''), _listItem.join(''))

    }
  }

  return new RegExp(`(${_regExp.filter(item => item && !item.includes('[]')).join('|')})`).test(str)
}
