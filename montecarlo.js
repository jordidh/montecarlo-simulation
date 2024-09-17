/*
JDH 16/09/2024 amb ChatGPT
Simulació de Montecarlo:
    Es realitza la simulació N vegades.
    En cada simulació, per a cada risc, es genera un nombre aleatori entre 0 i 1 per decidir si el risc es produeix (si el nombre aleatori és menor o igual a la probabilitat del risc).
    Si el risc es produeix, el seu impacte s'afegeix al total d'aquella simulació.
Funció per calcular la mitjana: 
    A partir dels resultats de totes les simulacions, es calcula la mitjana de l'impacte total acumulat.
Funció per calcular el percentil:
    S'ordenen els resultats, i es calcula el valor que correspon al percentil 95 (en aquest cas, un punt on només el 5% de les simulacions tenen un impacte superior).
Sortida: 
    Mostra la mitjana d'impacte i el percentil 95, que es pot utilitzar com a base per al contingent de risc necessari.
    
TODO: 
    Calcular a partir de impacte mínim, més probable i màxim
    Calcular: mitjana, media, moda, desviació estandar, skewness i kurtosis
    Mostrar l'histograma (freqüència x impacte)
    Mostrar histograma cumulatiu normalitzat dels impactes dels riscs
*/
// Definir els riscos amb probabilitat (P) i impacte (I)
// Cada risc es defineix com un objecte { probabilitat, impacte }
const riscos = [
  // { probabilitat: 0.1, impacte: 10000 },  // Ex: 10% de probabilitat amb impacte de 10000
  // { probabilitat: 0.3, impacte: 5000 },   // Ex: 30% de probabilitat amb impacte de 5000
  // { probabilitat: 0.2, impacte: 20000 },  // Ex: 20% de probabilitat amb impacte de 20000
  // Afegeix més riscos si cal
  { probabilitat: 0.2, impacte: 5000 },
  { probabilitat: 0.15, impacte: 8000 },
  { probabilitat: 0.3, impacte: -10000 },
  { probabilitat: 0.25, impacte: 7000 },
  { probabilitat: 0.1, impacte: 12000 },
  { probabilitat: 0.05, impacte: -15000 },
  { probabilitat: 0.12, impacte: 6000 },
  { probabilitat: 0.08, impacte: 10000 },
  { probabilitat: 0.18, impacte: -9000 },
  { probabilitat: 0.22, impacte: 7500 }

];

// Nombre de simulacions a realitzar
const N = 100000;

// Funció per calcular la mitjana dels resultats
function calcularMitjana(resultats) {
  const sum = resultats.reduce((a, b) => a + b, 0);
  return sum / resultats.length;
}

// Funció per calcular la mediana dels resultats
function calcularMediana(resultats) {
  resultats.sort((a, b) => a - b);
  const mid = Math.floor(resultats.length / 2);
  
  if (resultats.length % 2 === 0) {
    // Si el nombre de valors és parell, retornem la mitjana dels dos valors centrals
    return (resultats[mid - 1] + resultats[mid]) / 2;
  } else {
    // Si el nombre de valors és imparell, retornem el valor del mig
    return resultats[mid];
  }
}

function calcularHistograma(resultats) {
  const freqMap = {};
  resultats.forEach(num => {
    freqMap[num] = (freqMap[num] || 0) + 1;
  });
  return freqMap;
}

function sortHistogram(freqMap) {
  // TODO: This sorts as string but the key must be sorted as a number
  const ordered = Object.keys(freqMap).sort().reduce(
    (obj, key) => { 
      obj[key] = freqMap[key]; 
      return obj;
    }, 
    {}
  );
  return ordered;
}

// Funció per calcular la moda dels resultats
function calcularModa(freqMap) {
  let maxFreq = 0;
  let moda = [];
  for (const key in freqMap) {
    if (freqMap[key] > maxFreq) {
      moda = [Number(key)];
      maxFreq = freqMap[key];
    } else if (freqMap[key] === maxFreq) {
      moda.push(Number(key));
    }
  }

  // Retornem la moda o una llista de valors si hi ha més d'una moda
  return moda.length === 1 ? moda[0] : moda;
}

// Funció per realitzar simulacions de Montecarlo
function simularMonteCarlo(riscos, N) {
  const resultats = [];

  for (let i = 0; i < N; i++) {
    let totalImpacte = 0;
    riscos.forEach(({ probabilitat, impacte }) => {
      // Generar un nombre aleatori entre 0 i 1 per determinar si el risc es produeix
      if (Math.random() <= probabilitat) {
        totalImpacte += impacte;
      }
    });
    resultats.push(totalImpacte);
  }

  return resultats;
}

// Funció per calcular la mitjana dels resultats
function calcularMitjana(resultats) {
  const sum = resultats.reduce((a, b) => a + b, 0);
  return sum / resultats.length;
}

// Funció per calcular el percentil d'una llista de valors
function calcularPercentil(resultats, percentil) {
  resultats.sort((a, b) => a - b);
  const index = Math.ceil(percentil / 100 * resultats.length) - 1;
  return resultats[index];
}

// Realitzar la simulació
const resultats = simularMonteCarlo(riscos, N);

// Calcular estadístiques dels resultats
const mitjanaImpacte = calcularMitjana(resultats);
const percentil90 = calcularPercentil(resultats, 90);
const percentil95 = calcularPercentil(resultats, 95);

// Calcular mitjana, mediana i moda
const mitjana = calcularMitjana(resultats);
const mediana = calcularMediana(resultats);
const histograma = calcularHistograma(resultats);
const histogramOrdered = sortHistogram(histograma);
console.log(histogramOrdered);
const moda = calcularModa(histograma);

// Mostrar els resultats
console.log(`Mitjana de l'impacte total simulat: ${mitjanaImpacte}`);
console.log(`Contingent de risc necessari (percentil 90): ${percentil90}`);
console.log(`Contingent de risc necessari (percentil 95): ${percentil95}`);

// Mostrar els resultats
console.log(`Mitjana: ${mitjana}`);
console.log(`Mediana: ${mediana}`);
console.log(`Moda: ${moda}`);

