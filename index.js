var schedule = require('node-schedule')
var fs = require('fs')
var xlsx = require('node-xlsx')
var Email = require('./email')
var config = require('./config')
var excel = require('./ex-excel')
var tools = require('./tools')
var content = require('./report_content')

console.log('start auto send email task')
var j = schedule.scheduleJob('05 17 * * 7', function() {
  var todayDate = tools.getTodayDate()
  var todayDateString = todayDate + ''
  if (content[todayDateString]) {
    sendEmail()
  } else {
    notify()
  }
})

var sendEmail = function() {
  console.log(new Date() + ' before send an email, your first output an excel file as your attachment')
  generateExcel()
  console.log(new Date() + ' its time to send a email')
  send()
}
var generateExcel = function() {
  excel.exExcel()
}
var notify = function() {
  var data = ''
  var email = new Email(config.mail_opts, data)
  email.sendNotify(function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info.response)
    }
  })
}
var send = function() {
  var data = {name: config.name};
  var email = new Email(config.mail_opts, data)
  email.send(function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info.response)
    }
  })
}
