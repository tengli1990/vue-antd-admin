/* eslint-disable */
/**
 * 加法得到金额数据（保留精度问题）
 * 调用例子：var total = Number(0.09999999).add(0.09999999);
 * @param arg
 * @returns {String}
 */
 Number.prototype.add = function (arg) {
  var r1, r2, m
  try { r1 = this.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))

  var val = (this * m + arg * m) / m
  m = val.toString()
  var num = m.split('.')
  if (num.length > 1) {
    var l = num[1]
    if (l.length < 2) {
      m = m + '0'
    }
  }
  return m
}

/**
 * 减法得到金额数据（保留精度问题）
 * 调用例子：var total = Number(-0.09999999).sub(0.00000001);
 * @param arg
 * @returns {String}
 */
Number.prototype.sub = function (arg) {
  return this.add(-arg)
}

// 乘法法获取精确值
Number.prototype.mul = function (num1, num2) {
  var m, s1, s2
  m = 0
  s1 = num1.toString()
  s2 = num2.toString()
  try { m += s1.split('.')[1].length } catch (e) {};
  try { m += s2.split('.')[1].length } catch (e) {};
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
// 除法获取精确值
Number.prototype.divide = (num1, num2) => {
  var t1, t2, r1, r2
  try {
    t1 = num1.toString().split('.')[1].length
  } catch (e) {
    t1 = 0
  }
  try {
    t2 = num2.toString().split('.')[1].length
  } catch (e) {
    t2 = 0
  }
  r1 = Number(num1.toString().replace('.', ''))
  r2 = Number(num2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
