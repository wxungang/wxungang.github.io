// @flow

/**
 * 用户输入参数校验
 *    1、参数的格式预处理：共用服务端 路由层 or 路由层调用其他格式化的工具类！
 *    2、每一个规则足够简单、通过组合形成复杂的校验！
 */
import keyboard from './validate_keyboard';

const LIMITPASSWORD = ['root', 'admin'];

export default {
  /**
   * 手机号 ：10 or 11 or 12 : false
   *
   * @param {string} str
   * @returns {boolean}
   */
  phone: function (str: string = ''): boolean {
    return /^1[3-9][0-9]{9}$/.test(str)
  },


  userName: function (str: string = ''): boolean {
    return this.range(str, 8) && this.chars(str)
  },

  email: function (str: string = ''): boolean {
    return /^\w+@\w+[.\w]+\w$/.test(str)
  },

  captcha: function (str: string = ''): boolean {
    return /^[0-9a-zA-Z]{4}$/.test(str)
  },

  range: function (str: string = '', min: number = 8, max: number = 32): boolean {
    if (min < 0) {
      min = 0
    }
    if (max < 1) {
      max = 1
    }
    return str.length >= min && str.length <= max
  },

  /**
   *
   * @param {string} str
   * @param {boolean} pure
   * @returns {boolean}
   */
  number: function (str: string = '', pure: boolean = false): boolean {
    return pure ? /^\d+$/.test(str) : /\d+/.test(str)
  },

  /**
   * 大小写字母
   *
   * @param {string} str
   * @param {boolean} pure
   * @returns {boolean}
   */
  letters: function (str: string = '', pure: boolean = false): boolean {
    return pure ? /^[a-zA-Z]+$/.test(str) : /[a-zA-Z]+/.test(str)
  },

  letters_up: function (str: string = '', pure: boolean = false): boolean {
    return pure ? /^[A-Z]+$/.test(str) : /[A-Z]+/.test(str)
  },

  letters_low: function (str: string = '', pure: boolean = false): boolean {
    return pure ? /^[a-z]+$/.test(str) : /[a-z]+/.test(str)
  },

  /**
   * 字符集合： _0-9a-zA-Z
   *
   * @param {string} str
   * @param {boolean} pure
   * @returns {boolean}
   */
  chars: function (str: string = '', pure: boolean = false): boolean {
    return pure ? /^\w+$/.test(str) : /\w+/.test(str)
  },

  /**
   * 要求：
   *    1、length > 7
   *    2、数字 & 字母（大小写) & 特殊字符 中的三种及以上
   *
   * @param {string} str
   * @returns {boolean}
   */
  password: function (str: string = '', minLength: number = 8): boolean {
    if (str.length < minLength) {
      return false;
    }

    if (LIMITPASSWORD.includes(str)) {
      return false;
    }

    if (keyboard(str)) {
      return false;
    }

    return [this.number(str), this.letters_up(str), this.letters_low(str), !this.chars(str, true)].filter(item => item).length > 2
  }
}


