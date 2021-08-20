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


