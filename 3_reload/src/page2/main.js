import './style.css'

if(ENV == 'DEV') {
	require('pages/html/page2.html')
}

console.log(ENV)

import { log } from '../common/index.js'

log('this is page2')
