/*
 * Workaround for a crash in some versions of @dcloudio/uni-cli-shared on Windows.
 *
 * The upstream normalizePath implementation assumes the input is always a string.
 * When it is undefined (e.g. during fatal error reporting), it throws and hides
 * the original error.
 */

'use strict'

try {
  const util = require('@dcloudio/uni-cli-shared/lib/util')

  if (util && typeof util.normalizePath === 'function') {
    const originalNormalizePath = util.normalizePath

    util.normalizePath = function normalizePathPatched (p) {
      if (p === undefined || p === null) {
        return ''
      }
      if (typeof p !== 'string') {
        try {
          return originalNormalizePath(String(p))
        } catch (e) {
          return String(p)
        }
      }
      return originalNormalizePath(p)
    }
  }
} catch (e) {
  // ignore
}
