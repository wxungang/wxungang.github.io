/**
 calculate created by xiaogang on 2017/11/16
 功能描述：
 */

$(function () {
  const keys = [
    ['C', '+/-', '<=', '+'],
    ['1', '2', '3', '-'],
    ['4', '5', '6', '*'],
    ['7', '8', '9', '/'],
    ['.', '0', '%', '=']
  ];
  var inputValue = '';
  var expression = '';

  init();
  input();
//    clear();
//    back();

  function init() {
    $('#keys').html(keys.map(list => list.map(key => `<p class="key" id="key_${key}" attr="${key}">${key}</p>`).join('')).join(''));
  };

  function clear() {
    //清空 inputValue
    inputValue = '';
    expression = '';

    $('#input').text('');
    $('#result').text('0');
    //dom 存储
    $("#input").attr('expression', expression).attr('inputValue', inputValue);
  }

  function back() {
    // let _input = $('#input').text();
    // $("#input").text(_input.replace(/.$/i, ''));
    if (inputValue) {
      inputValue = inputValue.replace(/.$/i, '');
    } else {
      expression = expression.replace(/.$/i, '');
    }

    updateInput();

    //实时计算
    result();
  }

  function calculate(_key) {
    if (_key === '0' && inputValue === '0') {
      return;
    }

    //更新输入值
    inputValue += _key;
    //处理小数点

    updateInput();

    //实时计算
    result();
  }

  function updateInput() {
    //更新表达式的显示
    $("#input").text((expression + inputValue));
    //dom 存储
    $("#input").attr('expression', expression).attr('inputValue', inputValue);
  }

  function dot(key) {
    //重复小数点
    if (inputValue.indexOf('.') > -1) {
      return;
    }
    //补全小数点前面的 0
    if (!inputValue) {
      inputValue = '0.';
    } else {
      inputValue += key;
    }

    updateInput();

  }

  function reverse() {
    if (inputValue) {
      inputValue = '(' + (0 - inputValue) + ')';
      flag('+');
      //updateInput();
      //实时计算
      result();
    }
  }

  function percent() {
    if (inputValue) {
      inputValue = inputValue / 100;

      updateInput();
      //实时计算
      result();
    }
  }

  function flag(key) {
    //更新表达式 同时 去除 上一次的运算符
    expression = (expression + inputValue).replace(/[+\-*/]$/i, '');
    //更新运算符
    expression += expression ? key : '';
    //清空 inputValue
    inputValue = '';

    updateInput();

  }

  function result() {
    //获取实时表达式
    let _input = $('#input').text();
    //退格时 去除最后的运算符
    _input = _input.replace(/[+\-*/]$/i, '');
    console.log(_input);
    try {
      //尝试计算结果
      let _result = eval(_input);
      $('#result').text(_result || 0);
    } catch (e) {
      console.log(e);
    }
  }

  function input() {
    $('#keys').on('click', '.key', function (e) {
      //获取 input 输入值！
      let _key = $(this).text();

      switch (_key) {
        case 'C':
          clear();
          break;
        case '+/-':
          reverse();
          break;
        case '<=':
          back();
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          flag(_key);
          break;
        case '.':
          dot(_key);
          break;
        case '%':
          percent();
          break;
        case '=':
          result();
          break;
        default:
          calculate(_key);
          break;
      }

    });
  }
});
