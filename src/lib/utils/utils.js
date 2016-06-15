export function add3Dots(string, limit) {
  let res = string;

  if (string.length > limit) {
    res = `${string.substring(0, limit)}...`;
  }

  return res;
}

export function validMaster(master) {
  if (master !== '  ') {
    return master;
  }
  return '[Información Pendiente]';
}

export function validPlace(place) {
  if (place !== 'null') {
    return place;
  }
  return '-- --';
}

export function objToArray(obj) {
  const array = [];

  for (let x = 0; x < Object.keys(obj).length; x++) {
    array[x] = obj[Object.keys(obj)[x]];
  }

  return array;
}

export function typeColor(type) {
  let res = '';

  switch (type) {
    case 'C':
      res = 'disc';
      break;
    case 'P':
      res = 'nive';
      break;
    case 'B':
      res = 'fund';
      break;
    case 'L':
      res = 'libr';
      break;
    case 'M':
      res = 'mult';
      break;
    case 'O':
      res = 'obli';
      break;
    case 'T':
      res = 'eleg';
      break;
    default:
      res = 'mult';
      break;
  }

  return res;
}

export function getHeight(value) {
  const casilla = value * 18;

  let offset = 0;

  switch (value) {
    case 1:
      offset = -2;
      break;
    case 2:
      offset = 0;
      break;
    case 3:
      offset = 2;
      break;
    case 4:
      offset = 4;
      break;
    case 5:
      offset = 6;
      break;
    case 6:
      offset = 8;
      break;
    case 7:
      offset = 10;
      break;
    default:
      offset = 0;
      break;
  }

  return casilla + offset;
}

export function getColorGroup(id) {
  let color = '';

  switch (id) {
    case 0:
      color = '#709E51';
      break;
    case 1:
      color = '#BF893C';
      break;
    case 2:
      color = '#D06464';
      break;
    case 3:
      color = '#559C95';
      break;
    case 4:
      color = '#3E7EBD';
      break;
    case 5:
      color = '#7D68C1';
      break;
    case 6:
      color = '#A94F9F';
      break;
    case 7:
      color = '#1ABD7F';
      break;
    case 8:
      color = '#CEC500';
      break;
    case 9:
      color = '#8C7A4C';
      break;
    case 10:
      color = '#9C8BA7';
      break;
    default:
      color = '#7D7D7D';
      break;
  }

  return color;
}

export function getColorsType(type) {
  let res = {};

  switch (type) {
    case 'c':
      res = { backgroundColor: '#add494', color: '#35591c' };
      break;
    case 'p':
      res = { backgroundColor: '#fbca04', color: '#614e00' };
      break;
    case 'b':
      res = { backgroundColor: '#68c6ff', color: '#0c4070' };
      break;
    case 'l':
      res = { backgroundColor: '#d3c196', color: '#68582f' };
      break;
    case 'm':
      res = { backgroundColor: '#c2c2c2', color: '#595959' };
      break;
    case 'o':
      res = { backgroundColor: '#55669c', color: '#fff' };
      break;
    case 't':
      res = { backgroundColor: '#c39f53', color: '#fff' };
      break;
    default:
      res = { backgroundColor: '#ddd', color: '#666' };
      break;
  }

  return res;
}

export function getColorType(type) {
  let res = {};

  switch (type) {
    case 'c':
      res = { color: '#add494' };
      break;
    case 'p':
      res = { color: '#fbca04' };
      break;
    case 'b':
      res = { color: '#68c6ff' };
      break;
    case 'l':
      res = { color: '#d3c196' };
      break;
    case 'm':
      res = { color: '#c2c2c2' };
      break;
    case 'o':
      res = { color: '#55669c' };
      break;
    case 't':
      res = { color: '#c39f53' };
      break;
    default:
      res = { color: '#ddd' };
      break;
  }

  return res;
}

export function getPrefix(index) {
  let prefix = '';

  switch (index) {
    case 0:
      prefix = 'L';
      break;
    case 1:
      prefix = 'M';
      break;
    case 2:
      prefix = 'C';
      break;
    case 3:
      prefix = 'J';
      break;
    case 4:
      prefix = 'V';
      break;
    case 5:
      prefix = 'S';
      break;
    case 6:
      prefix = 'D';
      break;
    default:
      prefix = 'X';
      break;
  }
  return prefix;
}

export function ucFirst(string) {
  if (string) {
    return string.substr(0, 1).toUpperCase() + string.substr(1, string.length).toLowerCase();
  }
  return '';
}

export function ucWords(string) {
  let returnString = '';
  const arrayWords = string.split(' ');

  for (let x = 0; x < arrayWords.length; x++) {
    if (x !== (arrayWords.length - 1)) {
      returnString = `${returnString}${ucFirst(arrayWords[x])} `;
    } else {
      returnString = `${returnString}${ucFirst(arrayWords[x])}`;
    }
  }
  return returnString;
}

export function parseMap(map) {
  const res = [];

  for (let x = 0; x < 7; x++) {
    for (let y = 6; y < 21; y++) {
      if (map[x][y].state === 1) {
        const hours = map[x][y].group.hour.split('-');
        const count = hours[1] - hours[0];

        for (let z = 0; z < count; z++) {
          res.push(`${getPrefix(x)}${y + z}`);
        }
      }
    }
  }

  return res;
}

export function validGroup(group, map) {
  for (let x = 0; x < group.length; x++) {
    if (map.indexOf(group[x]) >= 0) {
      return false;
    }
  }
  return true;
}
