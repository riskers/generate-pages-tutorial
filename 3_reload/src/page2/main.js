require('./style.css')

if(ENV == 'DEV') {
	require('pages/html/page2.html')	
}

console.log(ENV)

var log = require('../common/index.js').log

log('this is page2')
