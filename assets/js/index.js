$(function () {
  getUserInfo()
  const layer = layui.layer

  // 退出登录
  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = './login.html'

      layer.close(index)
    })
  })
})

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token')||''
    // },
    success: function (res) {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败')
      }
      renderAvatar(res.data)
    },
    
  })
}

// 渲染用户信息
function renderAvatar(user) {
  const name = user.nickname || user.username
  $('.welcome').html('欢迎&nbsp;&nbsp' + name)
  if (user.user_pic) {
    $('.text-avatar').hide()
    $('.layui-nav-img').attr('src', user.user_pic).show()
  } else {
    $('.layui-nav-img').hide()
    $('.text-avatar').html(name[0].toUpperCase()).show()
  }
}