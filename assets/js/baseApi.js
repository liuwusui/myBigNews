// ajax请求拦截器 每次发送ajax请求前先拦截拼接url地址
// 每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPrefilter这个函数，在这个函数中，我们可以拿到我们girlajax提供的配置对象
$.ajaxPrefilter(function (options) {
  options.url = 'http://big-event-api-t.itheima.net' + options.url
  
  options.complete = function (res) {
    // console.log(res)
    if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
      location.href = '/login.html'
      localStorage.removeItem('token')
    }
  }
  if (options.url.indexOf('/my/' !== -1)) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
})