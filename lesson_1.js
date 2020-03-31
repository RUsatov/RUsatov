const sum = val => {

  let currentVal = val

  const foo = num => {
    currentVal += num
    return foo
  }

  foo.toString = () => currentVal

  return foo
}

console.log(sum(5)(10)(9)(-4)(4).toString())
