export const HEATMAP_FULL = 13;
export const HEATMAP_ZONE_QUARTER = 23

const defaultMapClass = 'redstone';
const defaultMapSize = 'size-70';


const getZone = (rangeAlpha, digitRange, type = 'circle', color = defaultMapClass, size = defaultMapSize) =>
{
  let mapStones = {}
  let classNamesMapStones = {}
  let alpha = rangeAlpha.toUpperCase().split('')
  let digits = digitRange.split(',')

  alpha.map((char) => {
    digits.map((digit) => {
      mapStones[`${char}${digit}`] = type
      classNamesMapStones[`${char}${digit}`] = `${size} ${color}`
    })
  })

  return {mapStones, classNamesMapStones};
}
export const MAP_QUARTERS = {
  '1': getZone('GHJKLMN', '7,8,9,10,11,12,13'),
  '2': getZone('ABCDEFG', '7,8,9,10,11,12,13'),
  '3': getZone('ABCDEFG', '1,2,3,4,5,6,7'),
  '4': getZone('GHJKLMN', '1,2,3,4,5,6,7'),
}

export const MAP_HALF = {
  '1': getZone('ABCDEFGGHJKLMN', '7,8,9,10,11,12,13'),
  '2': getZone('ABCDEFGGHJKLMN', '1,2,3,4,5,6,7'),
}

export const hints = [
  { 'id': 1,
    'handleHelp':{ type: "single", id: 1, count: 1 },
    'name': 'Лучший ход',
    'fine': 3},
  { 'id': 16,
    'handleHelp':{ type: "multiple", multipleHandleCount: 4, id: 16 },
    'name': 'Показать лучший из заданных 3 ходов',
    'fine': 2},
  { 'id': 13,
    'handleHelp':{ type: "map", id: HEATMAP_FULL },
    'name': 'Тепловая карта всей доски. Детализированная',
    'fine': 2},
  { 'id': 23,
    'handleHelp':{ type: "map", id: HEATMAP_ZONE_QUARTER },
    'name': 'В какой четверти доски сейчас лучший ход?',
    'fine': 1},
  { 'id': 34,
    'handleHelp':{ type: "score", id: 34 },
    'name': 'Кто побеждает на данный момент?',
    'fine': 1},
];
