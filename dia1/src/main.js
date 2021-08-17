import './style.css'

// ex 03 corrigindo data-js
const app = document.querySelector('[data-js="app"]')
app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`
// ex 04 escondendo elementos(adicionar mais funcionalidades)
const link = document.querySelector('[data-js="link"]')

link.addEventListener('click', (event) => {
  event.preventDefault()
  // add se não existir e remover se existir
  app.classList.toggle('hide')
  event.target.textContent = event.target.textContent === 'Esconder' ? 'Exibir' : 'Esconder'
})
