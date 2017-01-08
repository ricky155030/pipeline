'use strict';

var fetch = require('isomorphic-fetch');

function init() {
  let counter = 0
  const func = []
  const self = {}

  function pipe(fn) {
    func.push(fn)
    return self
  }

  function run() {
    next()
  }

  function next() {
    const fn = func.shift()
    if(fn) {
      fn(next)
    }
  }

  self.pipe = pipe
  self.run = run

  return self
}

const pipeline = init()

pipeline
  .pipe(function(next) { console.log('first'); next() })
  .pipe(function(next) { console.log('second'); })
  .run()
