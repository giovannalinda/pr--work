/*
 ex 01 - primeiro caractere de cada palavra maiúscula,
 e outras letras devem ser minúsculas
*/
const inputName = document.querySelector('[data-js="username"]');
const canNotChange = ['da', 'do', 'de', 'das', 'dos'];
// atribui evento que escuta as alterações no elemento
inputName.addEventListener('input', (event) => {
  // pega dados de entrada do usuário
  // quebrar
 const Array = event.target.value.split(' ')
  // transforma cada item do array
  console.log('Valor do array: ', Array)
  event.target.value = Array.map((word) => {
    return canNotChange.includes(word.toLowerCase()) ? word.toLowerCase() : fix(word)
  }).join(' ')
});

function fix(word) {
  if (word.length === 0){
    return ''
  }
  return`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
};

/* ex 02
  Adicione ao formulário um select do tipo multiple com algumas cores para seleção.
*/
function $ (selector) {
  return document.querySelector(`[data-js="${selector}"]`);
};
// $ e _ também pode se usar como nome de váriavel
const form = $('form');
const select = document.createElement('select');
const colors = ['#836FFF', '#DC143C', '#00CED1', '#8A2BE2', '#FFB6C1'];
const colorBox = document.createElement('div');
colorBox.style.display = 'flex'
colors.forEach(color => {
  const option = document.createElement('option')
  option.value = color
  option.textContent = color
  select.appendChild(option)
});

select.addEventListener('change', (event) => {
  // limpando e passando novas cores
  colorBox.innerHTML = ''

  Array.from(event.target.selectedOptions).forEach(option => {
   // const div = document.createElement('div')
   div.style.width = '100px';
   div.style.height = '100px';
   div.style.background = option.value;
   colorBox.appendChild(div)
  });
});

function createDiv(value) {
  const div = document.createElement('div')
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.background = value;
  colorBox.appendChild(div)
  return div
}

select.setAttribute('multiple', '');
form.appendChild(select);
document.body.appendChild(colorBox)
