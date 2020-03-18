const { test, expect } = require('./test')
const { profile } = require('./profile')
const englishDictionary = require('./english-dictionary')

const p = profile(englishDictionary)

test('Can report percentage in top 1000 English vocab words', () => {
  expect(p('a about word words').percentage.topThousand).toEqual(100)
  expect(p('abandon about word absent').percentage.topThousand).toEqual(50)
  expect(p(`
    INSTRUCTIONS Type or paste your text here and click SUBMIT_window.  VocabProfile will tell you how many words the text contains from the following four frequency levels: () the list of the most frequent word families, () the second , () the Academic Word List, and () words that do not appear on the other lists. For a demo, enter this text, or one of the sample texts below.

    TEXT SET-UP
    General: Include an empty space after every comma or full stop.
    Research: Deal with spelling errors and proper nouns.

    SIZE LIMITS: Web form input is currently max about characters/ words - use VP-Compleat with Classic option for larger files`
  ).percentage.topThousand).toEqual(69.81)
})

test('Can report percentage in top 2000 English vocab words', () => {
  expect(p('abandon about word absent').percentage.topTwoThousand).toEqual(25)
  expect(p('?absence absent, absolute, absolutely, accident, accidents!.').percentage.topTwoThousand).toEqual(100)
  expect(p(`
    INSTRUCTIONS Type or paste your text here and click SUBMIT_window.  VocabProfile will tell you how many words the text contains from the following four frequency levels: () the list of the most frequent word families, () the second , () the Academic Word List, and () words that do not appear on the other lists. For a demo, enter this text, or one of the sample texts below.


    TEXT SET-UP
    General: Include an empty space after every comma or full stop.
    Research: Deal with spelling errors and proper nouns.


    SIZE LIMITS: Web form input is currently max about characters/ words - use VP-Compleat with Classic option for larger files`
  ).percentage.topTwoThousand).toEqual(9.43)
})

test('Can report percentage in top 1000 Academic English vocab words', () => {
  expect(p('abandon abandonment abstraction academia accessed accommodates').percentage.topAcademic).toEqual(100)
  expect(p('abandon about word  absent').percentage.topAcademic).toEqual(25)
  expect(p(`
    INSTRUCTIONS Type or paste your text here and click SUBMIT_window.  VocabProfile will tell you how many words the text contains from the following four frequency levels: () the list of the most frequent word families, () the second , () the Academic Word List, and () words that do not appear on the other lists. For a demo, enter this text, or one of the sample texts below.

    TEXT SET-UP
    General: Include an empty space after every comma or full stop.
    Research: Deal with spelling errors and proper nouns.


    SIZE LIMITS: Web form input is currently max about characters/ words - use VP-Compleat with Classic option for larger files`
  ).percentage.topAcademic).toEqual(14.15)
})
console.log('All tests passed')

