
/////////////////////////// FUNCTIONS ///////////////////////////

// interface Artist {
//     id: string;
//     name: string;
//   }
  
function findArtistIndex(artists, name) {
  for (let i = 0; i < artists.length; i++) {
    if (artists[i].name === name) {
      return artists[i].id;
    }
  }
  return -1;
}


function findArtistIndexDico(artists, name) {

  let left = 0;
  let right = artists.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (artists[mid].name === name) {
      return artists[mid].id;
    } else if (artists[mid].name < name) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

////////////////////////////////////////////////////////////////

// interface Artist {
//   id: string;
//   name: string;
//   genre: string;
//   stage: string;
// }

// interface Stage {
//   id: string;
//   name: string;
//   genres: Array<string>;
// }

function assignStages(artists, stages) {
  for (let stage of stages) {
    for (let artist of artists) {
      if (stage.genres.includes(artist.genre)) {
        artist.stage = stage.id;
        break;
      }
    }
  }
}


function assignStagesHash(artists, stages) {
  let hash = {};
  for (let stage of stages) {
    for (let genre of stage.genres) {
      hash[genre] = stage.id;
    }
  }

  for (let artist of artists)
  {
    artist.stage = hash[artist.genre];
  }
}




/////////////////////////// TESTS ///////////////////////////

function testTimeFunc(func, ...args)
{
    let start = performance.now();
    let r = func(...args);
    let end = performance.now();

    console.log('function : ' + func.name + ' took ' + (end-start) + ' ms' );
}


/////////////////////////// DATA ///////////////////////////

function createName (length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function genArrayArt(lengtData)
{
  let array = Array.from({length : lengtData});

  for (let i = 0; i < lengtData; i++)
  {
    array[i] = {id : i, name : createName(10)};
  }

  return array;
}

let array1 = genArrayArt(1000000);

/////////////////////////// FIND ARTIST ///////////////////////////

testTimeFunc(findArtistIndex, array1,  array1[array1.length-1].name);
testTimeFunc(findArtistIndexDico, array1,  array1[array1.length-1].name);