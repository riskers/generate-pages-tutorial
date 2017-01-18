require('./style.css')

if(ENV == 'DEV') {
	require('pages/html/page1.html')	
}

var log = require('../common/index.js').log

log('this is page1')
