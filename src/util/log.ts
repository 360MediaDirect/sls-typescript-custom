/* istanbul ignore file */
import { format, createLogger, transports } from 'winston'
import { SPLAT } from 'triple-beam'

const { LOG_LEVEL, LOG_FORMAT, LOG_SILENT, LOG_COLORS } = process.env

const formatName = LOG_FORMAT || 'default'

/**
 * Given an object and a key string, this function will return the key if it's
 * not currently used, or the key with an index number appended to it for the
 * first available free key. For example:
 *
 *     freeKey({}, 'foo') // "foo"
 *     freeKey({ foo: 'bar' }, 'foo') // "foo0"
 *     freeKey({ foo: 'bar', foo0: 'bar' }, 'foo') // "foo1"
 *
 * @param obj The object on which to find a free key
 * @param key The chosen key
 * @returns the first free key of the chosen prefix.
 */
const freeKey = (obj: object, key) => {
  if (!(key in obj)) return key
  let idx = 0
  let newKey
  do {
    newKey = `${key}${idx++}`
  } while (newKey in obj)
  return newKey
}

/**
 * Tests a string for case-insensitive affirmative values, like `1`, `True`,
 * `yes`, and `on`.
 * @param val The value to be testing for truthiness
 * @returns `true` if an affirnative value was found; `false` otherwise.
 */
const isTrueEnv = (val: string): boolean => {
  if (!val) return false
  const truthy = ['1', 'true', 'yes', 'on']
  val = val.trim().toLowerCase()
  return truthy.includes(val)
}

/**
 * A Winston formatter that catches raw Error objects passed as any argument
 * of a log function, and saves a nicely-formatted version to the `error` key.
 * If mulitple `error` keys are defined, this function will save them as
 * `error0`, `error1`, etc.
 */
const errorFormatter = format((info, opts = {}) => {
  if (!info[SPLAT]) return info
  info[SPLAT].forEach((elem) => {
    if (elem instanceof Error) {
      info[freeKey(info, 'error')] = opts.pipeNewline
        ? elem.stack?.replace(/\n\s+/g, ' | ')
        : elem.stack
    }
  })
  return info
})

const formats = {
  default: format.json(),
  json: format.json(),
  simple: format.simple()
}

const formatters: any = []
formatters.push(errorFormatter({ pipeNewline: true }))
if (isTrueEnv(LOG_COLORS || 'no')) formatters.push(format.colorize())
formatters.push(format.timestamp())

const log = createLogger({
  level: LOG_LEVEL || 'info',
  silent: isTrueEnv(LOG_SILENT || 'no'),
  format: format.combine(
    ...formatters,
    formats[formatName] ? formats[formatName] : formats.default
  ),
  transports: [new transports.Console()]
})

export default log
