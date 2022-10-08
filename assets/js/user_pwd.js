$(function () {
  let layer = layui.layer
  let form = layui.form
  form.verify({
    pass: [
      /^[\S]{4,8}$/
      , '密码必须4到8位，且不能出现空格'
    ],
    samePass: function (value) {
      if (value == $('[name="oldPwd"]').val()) {
        return '新密码不能与旧密码一样！'
      }
    },
    rePass: function (value) {
      if (value !== $('#newPwd').val()) {
        return '两次密码不一致'
      }
    },
  })

  $('#editPassForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success(res) {
        // console.log(res)
        console.log($('#editPassForm').serialize())
        
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        $('#editPassForm')[0].reset()
        // $('.layui-input-block [type="reset"]').click()
      }
    })
  })
})