const STORAGE = [];
let MEMORY = [];
let OUTPUT = [];

const STORAGE_SIZE = 102;
const CHUNK_SIZE = 7;

for (let i = 0; i < STORAGE_SIZE; i++) {
  STORAGE[i] = Math.round(Math.random() * 1000);
}

const storageSorted = [...STORAGE].sort((a, b) => (a - b));

const passesCount = Math.ceil(STORAGE_SIZE / CHUNK_SIZE);

console.log('passesCount', passesCount);

for (let i = 0; i < passesCount; i++) {
  for (let j = 0; j < CHUNK_SIZE; j++) {
    const absIndex = i * CHUNK_SIZE + j;

    if (absIndex >= STORAGE.length) {
      break;
    }

    MEMORY[j] = STORAGE[absIndex];
  }

  console.log(MEMORY, ' | ', MEMORY.length);


  OUTPUT = [...OUTPUT, [...MEMORY].sort((a, b) => a - b)]

  MEMORY = [];
  console.log('-');
}

console.log('OUTPUT', OUTPUT);

let isSorted = true;

for (let i = 0; i < STORAGE_SIZE; i++) {
  if (storageSorted[i] !== STORAGE[i]) {
    isSorted = false;
  }
}

// console.log('STORAGE: ', STORAGE);
console.log('Is STORAGE sorted: ', isSorted);
