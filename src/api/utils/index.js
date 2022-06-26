import { useContext, useState } from "react";
import { CurrentPlayModeContext, HasMiniPlayerContext, SetCurrentPlayModeContext } from "../../application/Home";
import { PlayMode } from "../constant";
import { getSongDetailRequest } from "../request";


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


/**
 * 获取随机整数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns 
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 页面是否需要加底部边界：用于有miniPlayer时底部需要预留边距
 * @returns 
 */
export function ShouldAddBottom(){
  const hasMiniPlayer = useContext(HasMiniPlayerContext)
  return hasMiniPlayer
}

/**
 * 获取当前播放模式信息
 * @returns {PlayMode}
 */
export function GetCurrentPlayMode(){
  const mode = useContext(CurrentPlayModeContext)
  return mode
}

/**
 * 获取下一个切换的播放模式
 * @returns 
 */
export function GetNextPlayMode(mode){
  const currentMode = mode || PlayMode.sequence
  const currentModeIndex =(currentMode.index + 1) % 3
  return Object.values(PlayMode).find(item=>item.index === currentModeIndex)
  
}

/**
 * 获取歌曲详情hook
 * @param {string} id 歌曲id
 * @returns 
 */
export function useSongDetail(id){
  const [song,setSong] = useState(null)

  if(id){
    getSongDetailRequest(id).then(res=>{
      setSong(res.songs[0])
    })
  }
  return song
}
