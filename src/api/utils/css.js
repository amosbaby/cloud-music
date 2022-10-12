// 给 css3 相关属性增加浏览器前缀，处理浏览器兼容性问题
const elementStyle = document.createElement('div').style;

const vendor = (() => {
  // 首先通过 transition 属性判断是何种浏览器
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform',
  };
  const list = Object.keys(elementStyle).filter((k) => k.endsWith('Transform'));

  const target = Object.keys(transformNames).find((key) => list.includes(transformNames[key]));

  return target || false;
})();
function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export default prefixStyle;
