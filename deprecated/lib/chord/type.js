'use strict'

var harmonics = require('../gamut/harmonics')

/**
 * Get the type of the chord (can be 'M', 'm', '7' or 'o' to represent major,
 * minot, dominant and dimished respectively)
 *
 * It assumes that the chord is not inversed (first note is always the tonic)
 *
 * It detects major, minor, augmented, diminished and dominant chords. All
 * chord notes beyond the 5th (except 7th for dominant chords) are ignored
 *
 * @name chord.type
 * @function
 * @param {Array} chord - the chord notes
 * @return {String} the chord type ('M', 'm', '7', 'dim', 'aug' or null)
 *
 * @example
 * var chord = require('music.kit/chord/type')
 * chord.type('C E G') // => 'M'
 * chord.type('C Eb G') // => 'm'
 * chord.type('C Eb Gb') // => 'dim'
 * chord.type('C E G#') // => 'aug'
 * chord.type('C E G B') // => 'M'
 * chord.type('C E G B7') // => '7'
 */
module.exports = function (chord) {
  var g = harmonics(chord)
  var steps = g.map(function (i) { return i.charAt(0) })
  if (steps[0] !== '1' || steps[1] !== '3' || steps[2] !== '5') return null
  if (g[1] === '3M') {
    if (g[2] === '5A') return 'aug'
    else return g[3] === '7m' ? '7' : 'M'
  } else if (g[1] === '3m') return g[2] === '5P' ? 'm' : 'dim'
  return null
}
