const test = (text, fn) => {
  try {
    fn()
  } catch (err) {
    console.log(`Failed: ${text}`)
    console.error(err)
    process.exit(1)
  }
}

const expect = receivedValue => ({
  toEqual: expectedValue => {
    if (expectedValue !== receivedValue) {
      throw new Error(`Expected: ${expectedValue}, Received: ${receivedValue}`)
    }
  }
})

module.exports = {
  test,
  expect
}

