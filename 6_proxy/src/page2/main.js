if(ENV == 'DEV') {
	require('pages/html/page2.php')	
}

import './style.css'
import { log } from '../common/index.js'

log('this is page2')

$('body')
	.append('<p>this is jQuery render</p>')
	.css('color', '#3f3f3f')