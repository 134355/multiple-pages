const timing = performance.timing
const start = timing.navigationStart

// DNS解析时间
const dnsTime = timing.domainLookupEnd - timing.domainLookupStart

// TCP建立时间
const tcpTime = timing.connectEnd - timing.connectStart

// 首屏时间
const firstPaintTime = timing.responseStart - start

// dom渲染完成时间
const domRenderTime = timing.domContentLoadedEventEnd - start

// 页面onload时间
const loadTime = timing.loadEventEnd - start

console.log('DNS解析时间:  ', dnsTime)
console.log('TCP建立时间:  ', tcpTime)
console.log('首屏时间:  ', firstPaintTime)
console.log('dom渲染完成时间:  ', domRenderTime)
console.log('页面onload时间:  ', loadTime)
