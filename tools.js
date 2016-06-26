var moment = require('moment')
exports.getTodayDate = function() {
  var date = new Date()
  return moment(date).format('L')
}
exports.getWorkDate = function(date) {
  var dayTime = 24 * 3600 * 1000
  var workTime = dayTime * 5
  var oldDate = date.getTime() - workTime
  return moment(oldDate).format('L')
}

