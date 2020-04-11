async function promiseReduce (asyncFunctions, reduce, initialValue) {
  let sum = initialValue
  do {
    let curFn = asyncFunctions.shift()
    sum = reduce(await curFn().then(function (fnArg) { return fnArg }), sum)
  } while (asyncFunctions.length > 0)

  return Promise.resolve(sum)
}

const fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}
const fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

const returnReduce = function (memo, value) {
  console.log('reduce')
  return memo * value
}

promiseReduce([fn1, fn2], returnReduce, 1)
  .then(console.log)
