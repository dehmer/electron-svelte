import path from 'path'
const { Writable, pipeline } = require('readable-stream')
import { Level } from 'level'
const { EntryStream } = require('level-read-stream')
import './global.css';

import App from './App.svelte';

const arg = key => {
  const entry = process.argv.find(s => s.startsWith(key))
  return entry ? entry.split('=')[1] : ''
}

// /Users/dehmer/Library/Application Support/NIDO/databases
const userData = arg('--user-data-dir')
const location = path.join(userData, 'databases', '1a8b35c7-efcc-4fa9-ba33-7a96731f1a30')
const db = new Level(location)

const entries = new EntryStream(db, {})
const destination = new Writable({
  objectMode: true,
  write (entry, _, next) {
    console.log('%s: %s', entry.key, entry.value)
    next()
  }
})

pipeline(entries, destination)

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;