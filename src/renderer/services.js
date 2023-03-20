import path from 'path'
import { Level } from 'level'
import { Disposable } from '../lib/disposable'

const arg = key => {
  const entry = process.argv.find(s => s.startsWith(key))
  return entry ? entry.split('=')[1] : ''
}

const memento = db => (key, initial) => {
  let subscriptions = []

  const subscribe = fn => {
    subscriptions = subscriptions.concat(fn)
    db.get(key).then(value => fn(value)).catch(() => fn(initial))
    // TODO: register database listener for key?
    return () => subscriptions = subscriptions.filter(x => x !== fn)
  }

  const set = value => {
    db.put(key, value)
    subscriptions.forEach(fn => fn(value))
  }

  const get = async () => {
    try {
      return await db.get(key)
    } catch (err) {
      return initial
    }
  }
  const update = async fn => set(fn(await get()))

  return {
    subscribe,
    set,
    get,
    update
  }
}

export default async fn => {
  const disposable = Disposable.of()

  const userData = arg('--user-data-dir')
  const location = path.join(userData, 'databases', '51b54ab9-6f69-437d-b5ab-d9895db7320c')
  const db = new Level(location)
  const sessionDB = db.sublevel('session', { valueEncoding: 'json' })

  disposable.add(() => db.close())

  fn({
    db,
    sessionDB,
    sessionMemento: memento(sessionDB)
  })

  return () => disposable.dispose()
}
