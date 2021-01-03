let formatNum = function(num) {
  if (!num) return;
  if (Math.abs(num) > 100000000) {
    return (num / 100000000).toFixed(2) + "亿";
  } else if (Math.abs(num) > 10000) {
    return (num / 10000).toFixed(0) + "万";
  } else {
    return num.toFixed(0);
  }
};
export default formatNum;
