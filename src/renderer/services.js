const arg = key => {
  const entry = process.argv.find(s => s.startsWith(key))
  return entry ? entry.split('=')[1] : ''
}

export default async () => {
  const userData = arg('--user-data-dir')
  // const location = path.join(userData, 'databases', '1a8b35c7-efcc-4fa9-ba33-7a96731f1a30')
  const location = path.join(userData, 'databases', '51b54ab9-6f69-437d-b5ab-d9895db7320c')
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

  return {
    db
  }
}
