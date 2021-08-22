import './style.css'
import { get, post } from './http'

const url = 'http://localhost:3333/cars'
const form = document.querySelector('[data-js="form-cars"]')
const table = document.querySelector('[data-js="table"]')

const getElements = (event) => (elementName) => {
  console.log(event.target.elements[elementName])
  return event.target.elements[elementName]
};

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const getElement = getElements(event)
  const image = getElement('image')
  const model = getElement('model')
  const year = getElement('year')
  const plate = getElement('plate')
  const color = getElement('color')

  const data = {
    image: image.value,
    model: model.value,
    year: year.value,
    plate: plate.value,
    color: color.value
  }

  const result = await post(url, data)
  if(result.error) {
    console.log('Erro na hora de cadastrar', result.message)
    return
  }

  const noContent = document.querySelector('[data-js="no-content"]')
  table.removeChild(noContent)

  createRow(data)

  event.target.reset()
  image.focus()
});

function createRow(data) {
  const tr = document.createElement('tr')

  const elements = [
    { type: 'image', value: data.image },
    { type: 'model', value: data.model },
    { type: 'year', value: data.year },
    { type: 'plate', value: data.plate },
    { type: 'color', value: data.color }
  ]

  elements.forEach(element => {
    const td = document.createElement('td')
    td.textContent = element.value
    tr.appendChild(td)
  })

  table.appendChild(tr)
}

  function createNoCar() {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    const th = document.querySelectorAll('table th')
    td.setAttribute('colspan', th.length)
    td.textContent = 'Nenhum carro encontrado!'

    tr.dataset.js = 'no-content'
    tr.appendChild(td)
    table.appendChild(tr)
  }

  async function main() {
  // pegar o erro
  const result = await post(url, data)

  if(result.error) {
    console.log('Erro ao buscar carros', result.message)
    return
  }

  if(result.length === 0) {
    createNoCar()
    return
  }
  // sucesso
  result.forEach(createRow)
  // funçao que cria uma linha na tabela para cada carro
}

main()

