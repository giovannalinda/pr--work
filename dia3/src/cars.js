const form = document.querySelector('[data-js="form-cars"]')
const table = document.querySelector('[data-js="table"]')

const getElements = (event) => (elementName) => {
  console.log(event.target.elements[elementName])
  return event.target.elements[elementName]
};

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const getElement = getElements(event)
  const image = getElement('image')
  const model = getElement('model')
  const year = getElement('year')
  const plate = getElement('plate')
  const color = getElement('color')

  const elements = [image, model, year, plate, color]

  const tr = document.createElement('tr')
  elements.forEach(element => {
    const td = document.createElement('td')
    td.textContent = element.value
    tr.appendChild(td)
  })
  table.appendChild(tr)

  event.target.reset()
  image.focus()
});

