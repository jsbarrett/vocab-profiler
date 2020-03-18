const { flatten } = require('./utils')

const format = text => text
  .replace(/-|,|\.|!|\?|;|_|\/|\\/g, ' ')
  .replace(/\n/g, ' ')
  .toLowerCase()
  .split('')
  .filter(x => x.match(/[a-z]|\s/) !== null)
  .join('')
  .split(' ')
  .filter(x => x !== '')

const percentageIn = wordList => formattedArray => {
  const flattenedWordList = flatten(wordList)

  const totalInList = formattedArray
    .reduce((totalInList, word) => {
      return (flattenedWordList.indexOf(word) !== -1)
        ? totalInList + 1
        : totalInList
    }, 0)
  return Math.round(totalInList / formattedArray.length * 10000) / 100
}

const profile = dictionary => text => {
  const formattedArray = format(text)
  const formattedText = formattedArray.join(' ')
  return {
    percentage: {
      topThousand: percentageIn(dictionary.topThousand)(formattedArray),
      topTwoThousand: percentageIn(dictionary.topTwoThousand)(formattedArray),
      topAcademic: percentageIn(dictionary.topAcademic)(formattedArray)
    },
    formattedText
  }
}

module.exports = {
  profile
}

