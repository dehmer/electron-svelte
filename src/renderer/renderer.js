import path from 'path'
const { Writable, pipeline } = require('readable-stream')
import { Level } from 'level'
const { EntryStream } = require('level-read-stream')
import './global.css';

import App from './App.svelte';


const app = new App({
	target: document.body
})

export default app;