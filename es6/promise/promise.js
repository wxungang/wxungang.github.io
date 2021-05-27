// normal();
unhandled_reject();
// reject_err();
/**
 * 常规 promise 功能
 * @param {} flag
 */
function normal() {
  demo();
  demo(true);
  function demo(flag = false) {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (flag) {
          resolve(flag);
        } else {
          reject(flag);
        }
      }, 0);
    })
      .then(
        (data) => {
          return data;
          // return Promise.resolve(data);
        },
        (err) => {
          //err 函数 需要自己主动的 reject 。（Promise 默认的 return 都是 resolve 到下一级)
          // return err;
          return Promise.reject(err);
        }
      )
      .then(
        (data) => {
          console.log('resolve==>', data);
        },
        (err) => {
          console.log('reject==>', err);
        }
      );
  }
}
/**
 * reject 不处理会警告
 */
function unhandled_reject() {
  demo();
  function demo(flag = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (flag) {
          resolve(flag);
        } else {
          reject(flag);
        }
      }, 0);
    });
  }
}

function reject_err() {
  demo().catch((err) => {
    // console.log(err);
  });
  function demo(flag = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (flag) {
          resolve(flag);
        } else {
          reject(new Error(flag));
        }
      }, 0);
    });
  }
}
