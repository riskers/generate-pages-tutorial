import './style.css'

if(ENV == 'DEV') {
	require('pages/html/page1.html')
}

import { log } from '../common/index.js'

log('this is page1')
