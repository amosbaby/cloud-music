const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const STATE_PAUSE = 0
const STATE_PLAYING = 1

export default class Lyric {
  /**
   * 
   * @param {string} lrc 
   * @param {function} handler 
   */
  constructor(lrc,handler = ()=>{},speed){
    this.speed = speed || 1
    this.lrc = lrc
    this.handler = handler
    this.state = STATE_PAUSE
    this.currentLineIndex = 0
    this.startStamp = 0
    this.timerList = []
    this.lines = this._initLines() // 解析后的数组，每一项包含对应的歌词和时间
  }

  /**
   * 解析代码
   */
  _initLines(){
    const lines = this.lrc.split('\n')
    return  lines.map(line=>{ 
      const result = timeExp.exec(line)
      if(!result) return null
      const text = line.replace(timeExp,'').trim() // 去掉时间戳
      if(!text) return null
      if(result[3].length === 3){
         result[3] = result[3]/10; //[00:01.997] 中匹配到的 997 就会被切成 99
      }
      return {
        time:result[1]*60*1000+result[2]*1000+(result[3]||0)*10, // 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
        text
      }
     }).filter(item=>!!item).sort((a,b)=>a.time - b.time)
  }

  _findLineIndex(offset){
    return this.lines.findIndex(item=> offset <= item.time)
  }

  _callHandler(lineIndex){
    if(lineIndex < 0) return
    this.handler({
      text: this.lines[lineIndex].text,
      lineIndex
    })
  }

  /**
   * 播放
   * @param {number} offset 时间进度;
   * @param {boolean} isSeek 用户是否手动调整进度
   */
  play(offset=0,isSeek=false){
    if(!this.lines.length)return 
    this.state = STATE_PLAYING
    // 找到当前行
    this.currentLineIndex = this._findLineIndex(offset)
    // 现在正处于第currentLine-1行，立即定位调用handler
    this._callHandler(this.currentLineIndex - 1)
    // 根据时间进度判断开始播放开始时间
    this.startStamp = +new Date() - offset
    if(this.currentLineIndex < this.lines.length){
      this._playRest(isSeek)
    }

  }

  _playRest(isSeek=false){
    if(this.currentLineIndex >= this.lines.length) return
    const currentLineTime = this.lines[this.currentLineIndex].time
    let delay = 0
    if(isSeek){
      delay = currentLineTime - (new Date() - this.startStamp)
    }else {
      const preLineTime = this.lines[this.currentLineIndex-1] ? this.lines[this.currentLineIndex-1].time : 0
      delay = currentLineTime - preLineTime
    }

    const timer = setTimeout(() => {
      this._callHandler(this.currentLineIndex++)
      if(this.currentLineIndex < this.lines.length && this.state === STATE_PLAYING){
        this._playRest()
      }
    }, delay/this.speed);
    this.timerList.push(timer)
  }

  stop(){
    this.timerList.forEach(timer=>{
      clearTimeout(timer)
    })
    this.timerList = []
    this.state = STATE_PAUSE
  }


  seek(offset){
    this.stop()
    this.play(offset,true)
  }

  togglePlay(offset){
    if(this.state === STATE_PLAYING){
      this.stop()
    }else{
      this.play(offset)
    }
  }

  changeSpeed(speed){
    this.speed = speed
  }
}
