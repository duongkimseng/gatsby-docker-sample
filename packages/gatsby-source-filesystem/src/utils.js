const path = require(`path`)
const Url = require(`url`)
const ProgressBar = require(`progress`)

/**
 * getParsedPath
 * --
 * Parses remote url to a path object
 *
 *
 * @param  {String}          url
 * @return {Object}          path
 */
function getParsedPath(url) {
  return path.parse(Url.parse(url).pathname)
}

/**
 * getRemoteFileExtension
 * --
 * Parses remote url to retrieve remote file extension
 *
 *
 * @param  {String}          url
 * @return {String}          extension
 */
export function getRemoteFileExtension(url) {
  return getParsedPath(url).ext
}

/**
 * getRemoteFileName
 * --
 * Parses remote url to retrieve remote file name
 *
 *
 * @param  {String}          url
 * @return {String}          filename
 */
export function getRemoteFileName(url) {
  return getParsedPath(url).name
}

// TODO remove in V3
export function createProgress(message, reporter) {
  if (reporter && reporter.createProgress) {
    return reporter.createProgress(message)
  }

  const bar = new ProgressBar(
    ` [:bar] :current/:total :elapsed s :percent ${message}`,
    {
      total: 0,
      width: 30,
      clear: true,
    }
  )

  return {
    start() {},
    tick() {
      bar.tick()
    },
    done() {},
    set total(value) {
      bar.total = value
    },
  }
}

/**
 * slash
 * --
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 *
 *
 * @param  {String}          path
 * @return {String}          slashed path
 */
export function slash(path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)

  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, `/`)
}
