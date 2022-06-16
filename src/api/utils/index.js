/**
 * 格式化播放量
 * @param {number} count 
 * @returns {string}
 */
export function formatPlayCount(count){
  if(count < 0) return ''
  if(count < 1000){
    return count+''
  }else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

/**
 * 防抖
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 防抖延迟时间，在此期间重新触发会导致重新计时
 * @returns 
 */
export function debounce(fn, delay){
  let timer
  return (...args)=>{
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this,args)
      clearTimeout(timer)
      timer = null
    }, delay);
  }
}

/**
 * 节流
 * @param {Function} fn 需要节流的函数
 * @param {number} delay 节流时间
 */
export function throttle(fn, delay){
  let isBlock = false
  let timer
  return (...args) => {
    if(isBlock){
      return
    }
    fn.apply(this,args)
    timer = setTimeout(() => {
      isBlock = false
      clearTimeout(timer)
      timer = null
    }, delay);
  }
}

// 处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

/**
 * 拼接出歌曲的url链接
 * @param {string} id 歌曲链接
 * @returns 
 */
export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};


/**
 * 转换歌曲播放时间
 * @param {number} interval 
 * @returns 
 */
export const formatPlayTime = interval => {
  interval = interval | 0;// |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};
