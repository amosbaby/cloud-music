const path = require('path');

console.log('哈哈');
module.exports = {
  resolve: {
    alias: {
      swipers: path.resolve(__dirname, '/node_modules/swiper'),
    },
  },
};
