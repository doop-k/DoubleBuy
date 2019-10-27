const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function timeConversionString(time) {
  var nowTime = formatTime(new Date()).split(' ');
  var time = time.split(' ');
  var ndate = nowTime[0].split('/');
  var ntime = nowTime[1].split(':')
  var date = time[0].split('-');
  var otime = time[1].split(':');
  if (ndate[0] != date[0]) {
    var num = ndate[0] - date[0];
    if (num == 1) {
      return "去年" + time[1] + '月' + time[2] + '日' + ' ' + otime[0] + ':' + otime[1];
    } else if (num == 2) {
      return "前年" + time[1] + '月' + time[2] + '日' + ' ' + otime[0] + ':' + otime[1];
    } else {
      return num + "年前" + time[1] + '月' + time[2] + '日' + ' ' + otime[0] + ':' + otime[1];
    }
  } else if (ndate[1] != date[1]) {
    return time[1] + '月' + time[2] + '日' + ' ' + otime[0] + ':' + otime[1];
  } else if (ndate[2] != date[2]) {
    var num = ndate[2] - date[2];
    if (num == 1) {
      return '昨天' + ' ' + otime[0] + ':' + otime[1];
    } else if (num == 2) {
      return "前天" +  otime[0] + ':' + otime[1];
    } else if(num==3){
      return num + "天前" + ' ' + otime[0] + ':' + otime[1];
    }else{
      return ndate[1]+'月'+ndate[2] +'日 ' + otime[0] + ':' + otime[1];
    }
  } else if (ntime[0] != otime[0]) {
    return otime[0] + ':' + otime[1];
  } else {
    var num = otime[1] - otime[1];
    if (num <= 3) {
      return '刚刚'
    } else {
      return otime[0] + ':' + otime[1];
    }
  }

}

module.exports = {
  formatTime: formatTime,
  timeConversionString: timeConversionString
}