var xlsx = require('node-xlsx')
var fs = require('fs')
var config = require('./config')
var content = require('./report_content')
var tools = require('./tools')

exports.exExcel = function() {
  var data = [['日期', '姓名', '本周完成', '下周计划', '月度计划']]
  var date = tools.getWorkDate(new Date()) + '-' + tools.getTodayDate()
  var cont = content[tools.getTodayDate() + '']
  var _content = [date, config.name, cont.done, cont.week_plan, cont.month_plan] 
  data.push(_content)
  var buffer = xlsx.build([{name: 'Xat', data: data}])
  var filename = 'test.xlsx'
  var filepath = './public/' + filename
  fs.writeFileSync(filepath, buffer, 'binary')
  console.log('generator excel done')
}
