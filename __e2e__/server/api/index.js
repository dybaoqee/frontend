import path from 'path'
import fs from 'fs'
import glob$ from 'glob'
import {promisify} from 'util'

const MOCKS_DIR = path.join(__dirname, 'mocks')

const glob = promisify(glob$)
const read = promisify(fs.readFile)

export default async function restMiddleware(req, res, next) {
  const requestPath = req.path
    .split('/')
    .filter((component) => component)
    .map((component) => `@(${component}|#)`)
    .join('/')
  const paths = await glob(`${requestPath}.json`, {cwd: MOCKS_DIR})
  if (paths.length) {
    const fileName = path.join(MOCKS_DIR, paths[0])
    const data = await read(fileName)
    res.status(200).json(JSON.parse(data))
  } else next()
}
