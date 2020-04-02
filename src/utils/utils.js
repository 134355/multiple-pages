// 无闪现下载excel
function download (url) {
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

export {
  download
}
