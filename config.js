
var config = { 
  port: 11052,
  name: '显示名称',
  mail_opts: {
    host: 'smtp.qq.com',
    port: 25,
    auth: {
      user: 'your_email_address',
      pass: 'your_email_password'
    },
    receiver: 'boss_email_address',
    subject: '工作周报',
    template: 'template'
  },
  excel_opts: {
    basename: 'excel_name',
    extraname: '工作周报'
  }
}

module.exports = config
