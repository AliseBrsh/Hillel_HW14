const baseUrl = 'http://numbersapi.com';

const numberTypes = {
  trivia: 'trivia',
  math: 'math',
  date: 'date',
  year: 'year',
};

const select = document.querySelector('#numberTypeSelect');
const input = document.querySelector('#numberInput');
const sendButton = document.querySelector('#sendButton');
const randomButton = document.querySelector('#randomBtn');
const resultBox = document.querySelector('#result');

sendButton.addEventListener('click', clickHandler);
select.addEventListener('change', changeHandler);
randomButton.addEventListener('click', randomHandler);

function changeHandler(event) {
  if (event.target.value === numberTypes.date) {
    input.type = 'string';
  } else {
    input.type = 'number';
  }
}

function clickHandler() {
  const number = input.value.trim();
  if (!number) {
    resultBox.innerText = 'Value can not be empty!';
    return;
  }
  getFact(select.value, number);
}

function rnd(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHandler() {
  const typesArray = ['trivia', 'math', 'date', 'year'];
  const randomIndex = rnd(0, typesArray.length - 1);
  const randomType = typesArray[randomIndex];
  fetch(`${baseUrl}/random/${randomType}`)
    .then((response) => {
      return response.text();
    })
    .then((fact) => {
      resultBox.innerText = fact;
    });
}

function getFact(type, number) {
  const urlMap = {
    trivia: `/${number}`,
    math: `/${number}/math`,
    date: `/${number}/date`,
    year: `/${number}/year`,
  };
  fetch(`${baseUrl}${urlMap[type]}`)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject();
      }
      return response.text();
    })
    .then((fact) => {
      resultBox.innerText = fact;
    })
    .catch(() => {
      resultBox.innerText = 'Invalid date format!';
    });
}
