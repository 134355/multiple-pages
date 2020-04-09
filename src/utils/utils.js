// 无闪现下载excel
export function download (url) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  function iframeLoad () {
    const win = iframe.contentWindow
    if (win.location.href === url) {
      iframe.parentNode.removeChild(iframe)
    }
  }
  if ('onload' in iframe) {
    iframe.onload = iframeLoad
  } else if (iframe.attachEvent) {
    iframe.attachEvent('onload', iframeLoad)
  } else {
    iframe.onreadystatechange = function onreadystatechange () {

    }
  }
  iframe.src = ''
  document.body.appendChild(iframe)

  setTimeout(function loadUrl () {
    iframe.contentWindow.location.href = url
  }, 50)
}

export function dateFormat (fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

export function parseParams (obj) {
  const params = {}
  Object.keys(obj).forEach(key => {
    if (key.includes('&')) {
      key.split('&').forEach((k, i) => {
        params[k] = (obj[key] && (obj[key][i] || '')) || ''
      })
    } else {
      params[key] = obj[key]
    }
  })
  return JSON.parse(JSON.stringify(params))
}
