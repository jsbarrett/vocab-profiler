const flatten = arrayOfArrays => {
  const newArr = []
  arrayOfArrays.forEach(arr => {
    arr.forEach(x => newArr.push(x))
  })

  return newArr
}

module.exports = {
  flatten
}
