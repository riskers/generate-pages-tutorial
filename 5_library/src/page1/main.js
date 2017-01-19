if(ENV == 'DEV') {
	require('pages/html/page1.html')
}

import './style.css'
import { log } from '../common/index.js'
log('this is page1')

import $ from 'jQuery'
$('body')
	.append('<p>this is jQuery render</p>')
	.css('color', '#FFF')
