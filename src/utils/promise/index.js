function Promise (executor) {
  var self = this;
  self.status = 'pending'; // promise当前状态
  self.data = undefined; //promise的值
  self.onResolvedCallback = []; //promise状态变为resolve时的回调函数集，可能有多个
  self.onRejectedCallback = []; //promise状态变为reject时的回调函数集，可能有多个

  function resolve(value) {
      setTimeout(function () {
          if(self.status === 'pending') {
              self.status = 'resolved';
              self.data = value;
              for(var i = 0; i < self.onResolvedCallback.length; i++) {
                  self.onResolvedCallback[i](value);
              }
          }
      })
  }

  function reject(reason) {
      setTimeout(function () {
          if(self.status === 'pending') {
              self.status = 'rejected';
              self.data = reason;
              for(var i = 0; i < self.onRejectedCallback.length; i++) {
                  self.onRejectedCallback[i](reason);
              }
          }
      })
  }

  try {
    executor(resolve, reject);
  } catch (e){
    reject(e);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2;
  onResolved = typeof onResolved === 'function'
    ? onResolved 
    : function (val) {return val};
  onRejected = typeof onRejected === 'function' 
    ? onRejected 
    : function (reason) {throw reason}; 
  // promise对象当前状态为resolved
  if(self.status === 'resolved') {
    return promise2 = new Promise(function (resolve, reject) {
        try {
            //调用onResolve回调函数
            var x = onResolved(self.data);
            //如果onResolve回调函数返回值为一个promise对象
            if(x instanceof  Promise) {
                //将它的结果作为promise2的结果
                x.then(resolve, reject);
            } else {
                resolve(x);//执行promise2的onResolve回调
        }          
        } catch (e) {
            reject(e); //执行promise2的onReject回调
        }
    })
  }
  //promise对象当前状态为rejected
  if(self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
        try {
            var x = onRejected(self.data);
            if (x instanceof Promise) {
                x.then(resolve, reject)
            } else {
                resolve(x)
            }
        } catch (e) {
            reject(e)
        }
    })
  }

  



};