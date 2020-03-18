<script>

import { flatten } from '../../src/utils'
import { profile } from '../../src/profile'
import englishDictionary from '../../src/english-dictionary'
const p = profile(englishDictionary)

const topThousandList = flatten(englishDictionary.topThousand)
const topTwoThousandList = flatten(englishDictionary.topTwoThousand)
const topAcademicList = flatten(englishDictionary.topAcademic)

let profiled = {}
let text = ''
let coloredText = ''
let leftover = 0

const roundToHundredth = x => Math.round(x * 100) / 100

const blueText = x => `<span style="color: #2196F3">${x}</span>`
const greenText = x => `<span style="color: #43A047">${x}</span>`
const yellowText = x => `<span style="color: #ffeb3b">${x}</span>`
const redText = x => `<span style="color: #e53935">${x}</span>`

const submit = () => {
  profiled = p(text)
  coloredText = profiled.formattedText
    .split(' ')
    .map(x => {
      if (topThousandList.indexOf(x) !== -1) return blueText(x)
      if (topTwoThousandList.indexOf(x) !== -1) return greenText(x)
      if (topAcademicList.indexOf(x) !== -1) return yellowText(x)
      return redText(x)
    })
    .join(' ')
  const { topThousand, topTwoThousand, topAcademic } = profiled.percentage
  leftover = roundToHundredth(100 - Number(topThousand) - Number(topTwoThousand) - Number(topAcademic))
}

</script>

<main>
  <textarea bind:value={text} style="width: 100%; height: 20rem;"></textarea>
  <button on:click={submit}>Submit</button>
  {#if profiled.percentage}
  <div>
    <ul style="padding: 0;">
      <li style="color: white; background-color: #2196F3;">
        Top 1000: {profiled.percentage.topThousand}%
      </li>
      <li style="color: white; background-color: #43A047;">
        Top 2000: {profiled.percentage.topTwoThousand}%
      </li>
      <li style="color: black; background-color: #ffeb3b;">
        Top Academic: {profiled.percentage.topAcademic}%
      </li>
      <li style="color: white; background-color: #e53935;">
        Off-List Words: {leftover}%
      </li>
    </ul>
  </div>
  <div style="background-color: #212121; padding: 1rem; font-size: 1.5rem;">
    { @html coloredText }
  </div>
  {/if}
</main>

<style>

main {
  text-align: center;
  padding: 1em;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
}

li {
  font-weight: bold;
  padding: 1rem;
  font-size: 2rem;
  list-style: none;
}

</style>
