let deck = [];

window.onload = function () {
  console.log('Sorting stuff out');

  //BOTON GENERAR CARTAS
  let boton = document.getElementById("draw");
  let amount = document.getElementById("cards");
  boton.addEventListener('click', (e) => {
    otracarta(amount.value);
    amount.value = "";
    let cuerpo = document.querySelector('.row');
    let deckParaHtml = []
    for (let i = 0; i < deck.length; i++) {
      deckParaHtml.push(deck[i].join(''));
    }
    cuerpo.innerHTML = deckParaHtml.join('');
  });

  //BOTON QUE ORDENA CARTAS
  let sorter = document.getElementById("sort");
  sorter.addEventListener('click', (e) => {
    selecSort(deck);
  });

  //BOTON PARA RESETEAR TABLERO
  const reload = document.getElementById('reset');
  reload.addEventListener('click', (e) => {
    location.reload();
  });
};

//FUNCION QUE ENTREGA NUMERO
function getnumber() {
  let char = '';

  let number = Math.floor(Math.random() * 13 + 1);
  if (number == 13) {
    char += 'K';
  }
  else if (number == 12) {
    char += 'Q';
  }
  else if (number == 11) {
    char += 'J';
  }
  else if (number == 1) {
    char += 'A';
  }
  else {
    char += `${number}`;
  }
  return char;
}

function getsuit() {
  let selectorpinta = Math.floor(Math.random() * 4);
  if (selectorpinta == 0) {
    return '<span style="color: red;">♥</span>';
  }

  else if (selectorpinta == 1) {
    return '<span style="color: red;">♦</span>';
  }

  else if (selectorpinta == 2) {
    return '<span>♠</span>';
  }

  else {
    return '<span>♣</span>';
  }
}

function getestilo(pinta) {

  let char = '<span';

  if (pinta.includes('red')) {
    char += ' style="color: red;">';
  }
  else {
    char += '>';
  }
  return char;
}

//FUNCION QUE CREA CARTA
function otracarta(num) {

  for (let i = 0; i < num; i++) {

    let pinta = getsuit();
    let estilo = getestilo(pinta)
    let valor = getnumber();
    let carta = [`<div class="carta col-3"><div class="suit" id="top">${pinta}</div><div id="center">${estilo}`, `${valor}`, `</span></div><div class="suit" id="bottom">${pinta}</div></div>`];
    deck.push(carta);
  }
}

function selecSort(arr) {
  let array = [...arr];

  if (array.length == 0) {
    window.alert("No cards to sort!");
  }

  else {
    let counter = 0;
    for (let i = 0; i < array.length - 1; i++) {

      let auxi = 0;

      if (array[i][1] === 'K') {
        auxi = 13;
      }
      else if (array[i][1] === 'Q') {
        auxi = 12;
      }
      else if (array[i][1] === 'J') {
        auxi = 11;
      }
      else if (array[i][1] === 'A') {
        auxi = 14;
      }
      else {
        auxi = parseInt(array[i][1]);
      }

      let min = auxi;
      let index = '';

      for (let j = i + 1; j < array.length; j++) {

        if (array[j][1] === 'K') {
          auxj = 13;
        }
        else if (array[j][1] === 'Q') {
          auxj = 12;
        }
        else if (array[j][1] === 'J') {
          auxj = 11;
        }
        else if (array[j][1] === 'A') {
          auxj = 14;
        }
        else {
          auxj = parseInt(array[j][1]);
        }

        if (min > auxj) {
          index = j;
          min = auxj;
        }
      }

      if (index != '') {
        let aux = array[i];
        array[i] = array[index];
        array[index] = aux;
      }

      let linea = document.createElement("div");
      linea.classList.add("d-flex");

      let arrayParaHtml = [];

      for (let i = 0; i < array.length; i++) {
        arrayParaHtml.push(array[i].join(''));
      }

      arrayParaHtml.unshift(`<h3>${counter}</h3>`);
      linea.innerHTML = arrayParaHtml.join('');
      document.querySelector(".container-flex").appendChild(linea);
      counter++;
    }

  }
}