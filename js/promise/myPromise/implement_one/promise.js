/**
 * Created by xiaogang on 2017/8/7.
 */
"use strict";

const PROMISESTATUS = {
    PEDDING: 'pedding',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
};


function myPromise(executor) {
    let _this = this;


    _this.status = PROMISESTATUS.PEDDING;
    _this.data = undefined;
    _this.resolvedCallbacks = [];
    _this.rejectedCallbacks = [];


    //
    console.log(`==============new promise===============`);
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e)
    }


    function resolve(value) {
        console.log(`======resolve=====${value}============`);
        if (_this.status === PROMISESTATUS.PEDDING) {
            _this.status = PROMISESTATUS.RESOLVED;
            _this.data = value;

            for (let i = 0; i < _this.resolvedCallbacks.length; i++) {
                _this.resolvedCallbacks[i](value);
            }
        }
    }

    function reject(reason) {
        console.log(`=======reject====${reason}============`);
        if (_this.status === PROMISESTATUS.PEDDING) {
            _this.status = PROMISESTATUS.REJECTED;
            _this.data = reason;

            for (let i = 0; i < _this.rejectedCallbacks.length; i++) {
                _this.rejectedCallbacks[i](reason);
            }
        }
    }

}

/**
 *
 * @param resolved
 * @param rejected
 */
myPromise.prototype.then = function (resolved, rejected) {
    console.log(this);

    let _this = this;// myPromise 实例
    let _newPromise;

    resolved = typeof resolved === 'function' ? resolved : function (res) {
    };
    rejected = typeof rejected === 'function' ? rejected : function (rej) {
    };


    if (PROMISESTATUS.RESOLVED === _this.status) {
        console.log(`=========then RESOLVED========`);
        return _newPromise = new myPromise((resolve, reject) => {
            try {
                let x = resolved(_this.data);
                if (x instanceof myPromise) {
                    x.then(resolve, reject)
                }

                resolve(x);
            } catch (e) {
                reject(e);
            }

        })
    }

    if (PROMISESTATUS.REJECTED === _this.status) {
        console.log(`=========then REJECTED========`);
        return _newPromise = new myPromise((resolve, reject) => {
            try {
                let x = rejected(_this.data);
                if (x instanceof myPromise) {
                    x.then(resolve, reject)
                }

            } catch (e) {
                reject(e);
            }
        })
    }

    if (PROMISESTATUS.PEDDING === _this.status) {
        return _newPromise = new myPromise((resolve, reject) => {
            console.log(`=========push pedding========`);

            _this.resolvedCallbacks.push(() => {
                try {
                    let x = resolved(_this.data);
                    if(x instanceof myPromise){
                        x.then(resolve,reject);
                    }
                }catch (e){
                    reject(e)
                }
            });

            _this.rejectedCallbacks.push(()=>{
                try {
                    let x = rejected(_this.data);
                    if(x instanceof myPromise){
                        x.then(resolve,reject);
                    }
                }catch (e){
                    reject(e)
                }
            });

        })
    }


}

