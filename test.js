var tools = require('./tools')
var content = require('./report_content')
var excel = require('./ex-excel')
var Email = require('./email')
var config = require('./config')

//console.log(tools.getTodayDate())
//console.log(tools.getWorkDate(new Date()))
//console.log(content)
//excel.exExcel()

//var email = new Email(config.mail_opts, '')
//email.sendNotify()

var todayDate = tools.getTodayDate() + ''
console.log(todayDate)
console.log(content[todayDate])
