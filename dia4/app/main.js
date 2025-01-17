import './style.css'
import { get, post, del } from './http'

const url = 'http://localhost:3333/cars'
const form = document.querySelector('[data-js="form-cars"]')
const table = document.querySelector('[data-js="table"]')

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName]
};

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
}

function createImage (data) {
  const td = document.createElement('td')
  const img = document.createElement('img')
  img.src = data.src
  img.alt = data.alt
  img.width = 100
  td.appendChild(img)
  return td
}

function createText (value) {
  const td = document.createElement('td')
  td.textContent = value
  return td
}

function createColor (value) {
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.background = value
  td.appendChild(div)
  return td
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const getElement = getFormElement(event)
  const image = getElement('image')
  const brandModel = getElement('brand-model')
  const year = getElement('year')
  const plate = getElement('plate')
  const color = getElement('color')

  const data = {
    image: image.value,
    brandModel: brandModel.value,
    year: year.value,
    plate: plate.value,
    color: color.value
  }

  const result = await post(url, data)
  if (result.error) {
    console.log('Erro na hora de cadastrar', result.message)
    return
  }

  const noContent = document.querySelector('[data-js="no-content"]')
  if (noContent) {
    table.removeChild(noContent)
  }

  createRow(data)

  event.target.reset()
  image.focus()
});

function createRow(data) {
  const elements = [
    { type: 'image', value: { src: data.image, alt: data.brandModel } },
    { type: 'text', value: data.brandModel },
    { type: 'text', value: data.year },
    { type: 'text', value: data.plate },
    { type: 'color', value: data.color }
  ]

  const tr = document.createElement('tr')
  tr.dataset.plate = data.plate

  elements.forEach(element => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })

  const button = document.createElement('button')
  button.textContent = 'Excluir'
  button.dataset.plate = data.plate

  button.addEventListener('click', handleDelete)
  tr.appendChild(button)

  table.appendChild(tr)
}

async function handleDelete(event) {
  const button = event.target
  const plate = button.dataset.plate

  const result = await del(url, { plate })

  if (result.error) {
    console.log('Erro ao deletar', result.message)
    return
  }

  const tr = document.querySelector(`tr[data-plate="${plate}"]`)
  table.removeChild(tr)
  button.removeEventListener('click', handleDelete)

  const allTrs = table.querySelector('tr')
  if(!allTrs){
    createRow()
  }
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

async function main(data) {
  // pegar o erro
  const result = await get(url, data)

  if (result.error) {
    console.log('Erro ao buscar carros', result.message)
    return
  }

  if (result.length === 0) {
    createNoCar()
    return
  }
  // sucesso
  result.forEach(createRow)
  // funçao que cria uma linha na tabela para cada carro
}

main()

