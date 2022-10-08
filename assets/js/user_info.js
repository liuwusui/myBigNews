$(function () {
  let layer = layui.layer
  var form = layui.form // 获得 form 模块对象

  // 表单验证
  form.verify({
    nickname: function (value) { //value：表单的值、item：表单的DOM对象
      if (value.length > 6) {
        layer.msg('昵称长度必须在1-6位字符之间')
      }
    },
  })

  initUserInfo()
  // 重置按钮
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  $('#editForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        console.log($('#editForm').serialize(),)
        // id=8967&username=liuwusui&nickname=%E5%A5%BD&email=1%40qq.com
        layer.msg(res.message)
        initUserInfo()
        window.parent.getUserInfo()
      }
    })

  })

  function initUserInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        form.val('formUserInfo', res.data)
      }
    })
  }
})