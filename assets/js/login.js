$(function () {
  $('.go2reg').on('click', function () {
    $('.loginPart').hide()
    $('.regPart').show()
    $('.login-reg-box').css('height', '310px')
  })
  $('.go2log').on('click', function () {
    $('.regPart').hide()
    $('.loginPart').show()
    $('.login-reg-box').css('height', '260px')
  })

  var form = layui.form
  var layer = layui.layer
  // let baseUrl = 'http://big-event-api-t.itheima.net'

  // 表单验证 密码框
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repass: function (val) {
      let pwd = $('#pass').val()
      if (pwd !== val) {
        return '两次密码不一致'
      }
    }
  })

  // 注册表单提交
  $('#reg_form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#reg_form [name=username]').val(),
        password: $('#reg_form [name=password]').val()
      },
      success: function (res) {   
        if (res.status != 0) {
          // return console.log(res.message)
          return layer.msg(res.message, {
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
          })
        }
        $('.go2log').click()
        layer.msg(res.message, {
          time: 1000 //2秒关闭（如果不配置，默认是3秒）
        })
      }
    })

  })

  // 登录表单提交
  $('#log_form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success(res) {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message), {
            time: 1000
          }
        }
          // layer.msg(res.message), {
          //   time: 1000
          // },
        localStorage.setItem('token', res.token)
        location.href = './index.html'
      }
    })
  })
})

