var mail = require('nodemailer')
var fs = require('fs')
var _ = require('underscore')
var config = require('./config.js')
var smtpTransport = require('nodemailer-smtp-transport')

var Email = function(options, data, attachments) {
  this.options = options
  this.data = data
  if (attachments) {
    this.attachments = attachments
  } else {
    this.attachments = [{
      fileName: 'test.xlsx',
      path: './public/test.xlsx',
      cid: 'image_cid'
    }]
  }
}

Email.prototype.sendNotify = function(callback) {
  var html = '<p>请尽快填写你的周报</p>'
  var messageData = {
    to: config.mail_opts.auth.user,
    from: config.name + "<" + config.mail_opts.auth.user + ">",
    subject: this.options.subject,
    html: html
  }
  transport = this.getTransport()
  return transport.sendMail(messageData, callback)
}

Email.prototype.send = function(callback) {
  var html = this.getHtml(this.options.template, this.data)
  var attachments = this.getAttachments(html)
  var messageData = {
    to: this.options.receiver,
    from: config.name + "<" + config.mail_opts.auth.user + ">",
    subject: this.options.subject,
    html: html,
    generateTextFromHMTL: true,
    attachments: attachments
  }
  console.log(this.options.receiver)
  transport = this.getTransport()
  return transport.sendMail(messageData, callback)
}
Email.prototype.getTransport = function() {
  return mail.createTransport(smtpTransport(config.mail_opts))
}
Email.prototype.getHtml = function(templateName, data) {
  var templatePath = './private/sendMail/template/' + templateName + '.html'
  var templateContent = fs.readFileSync(templatePath, encoding = 'utf-8')
  return _.template(templateContent, data, {
    interpolate: /\{\{(.+?)\}\}/g
  })
}
Email.prototype.getAttachments = function(html) {
  var attachments = []
  var ref = this.attachments
  var len = ref.length
  for (var i = 0; i < len; i++) {
    attachment = ref[i]
    //if (html.search('cid:' + attachment.cid) > -1) {
    attachments.push(attachment)
    //}
  }
  return attachments
}
module.exports = Email
