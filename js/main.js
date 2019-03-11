const formEl = get('.form')
const filterButtons = getAll('.filter > button')
const entriesContainer = get('.entries')
const totalEl = get('.total__num')
const topicEl = get('[name="topic"]', formEl)
const hoursEl = get('[name="hours"]', formEl)

let selectedFilter = 'all'
let entries = [
  { topic: 'css', hours: 3.5 },
  { topic: 'html', hours: 2.5 },
  { topic: 'js', hours: 12 },
  { topic: 'shell', hours: 1.5 },
  { topic: 'css', hours: 2.5 },
  { topic: 'js', hours: 4.5 },
  { topic: 'html', hours: 1.5 },
  { topic: 'html', hours: 1.0 },
  { topic: 'html', hours: 3.0 },
  { topic: 'shell', hours: 3.5 },
]

formEl.addEventListener('submit', onSubmit)
filterButtons.forEach(addFilterButtonLogic)
render()

function onSubmit(event) {
  event.preventDefault()

  const topic = topicEl.value
  const hours = Number(hoursEl.value)

  addEntry(topic, hours)
  resetForm()
  render()
  updateTotal()
}

function addFilterButtonLogic(btn) {
  btn.addEventListener('click', () => {
    const topic = btn.dataset.topic
    selectedFilter = topic
    activateFilterButton(topic)
    render()
  })
}

function activateFilterButton(topic) {
  filterButtons.forEach(btn =>
    btn.dataset.topic === topic
      ? btn.classList.add('active')
      : btn.classList.remove('active')
  )
}

function addEntry(topic, hours) {
  if (topic !== '' && hours > 0) {
    entries = [...entries, { topic, hours }]
  }
}

function render() {
  entriesContainer.innerHTML = ''
  getFilteredEntries().forEach(renderSingleEntry)
  updateTotal()
}

function getFilteredEntries() {
  return selectedFilter === 'all'
    ? entries
    : entries.filter(entry => entry.topic === selectedFilter)
}

function renderSingleEntry(entry) {
  const el = document.createElement('div')

  const { hours, topic } = entry

  el.className = 'entry'
  el.innerHTML = `
    <em>${topic}</em>
    <strong>${hours}</strong>
  `
  entriesContainer.insertAdjacentElement('beforeend', el)
}

function resetForm() {
  topicEl.value = ''
  hoursEl.value = ''
  topicEl.focus()
}

function updateTotal() {
  const total = getFilteredEntries().reduce(
    (prev, curr) => prev + curr.hours,
    0
  )
  totalEl.innerHTML = total
}

function get(sel, target = document) {
  return target.querySelector(sel)
}

function getAll(sel, target = document) {
  return Array.from(target.querySelectorAll(sel))
}
