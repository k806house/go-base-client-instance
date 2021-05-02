import tags from './tags';

export const HEATMAP_FULL = 13;
export const HEATMAP_ZONE_QUARTER = 23
export const HEATMAP_ZONE_HALF = 24

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
  {
    'id': 1,
    'handleHelp':{ type: "single", id: 1, count: 1 },
    'name': 'Лучший ход',
    'fine': 3
  },
  {
    'id': 2,
    'handleHelp':{ type: "single", id: 2, count: 2 },
    'name': '2 лучших хода',
    'fine': 3
  },
  {
    'id': 3,
    'handleHelp':{ type: "single", id: 3, count: 3 },
    'name': '3 лучших хода',
    'fine': 3
  },
  {
    'id': 4,
    'handleHelp':{ type: "single", id: 4, count: 4 },
    'name': '4 лучших хода',
    'fine': 3
  },
  {
    'id': 9,
    'handleHelp':{ type: "single", id: 9, count: 2 },
    'name': 'Развитие игры на 2 хода вперед',
    'fine': 3
  },
  {
    'id': 10,
    'handleHelp':{ type: "single", id: 10, count: 3 },
    'name': 'Развитие игры на 3 хода вперед',
    'fine': 3
  },
  {
    'id': 11,
    'handleHelp':{ type: "single", id: 11, count: 4 },
    'name': 'Развитие игры на 4 хода вперед',
    'fine': 3
  },
  {
    'id': 13,
    'handleHelp':{ type: "map", id: HEATMAP_FULL },
    'name': 'Тепловая карта всей доски. Детализированная',
    'fine': 2
  },
  {
    'id': 15,
    'handleHelp':{ type: "multiple", multipleHandleCount: 3, id: 15 },
    'name': 'Показать лучший из заданных 2 ходов',
    'fine': 2
  },
  {
    'id': 16,
    'handleHelp':{ type: "multiple", multipleHandleCount: 4, id: 16 },
    'name': 'Показать лучший из заданных 3 ходов',
    'fine': 2
  },
  {
    'id': 17,
    'handleHelp':{ type: "multiple", multipleHandleCount: 5, id: 17 },
    'name': 'Показать лучший из заданных 4 ходов',
    'fine': 2
  },
  {
    'id': 23,
    'handleHelp':{ type: "map", id: HEATMAP_ZONE_QUARTER },
    'name': 'В какой четверти доски сейчас лучший ход?',
    'fine': 1
  },
  {
    'id': 25,
    'handleHelp':{ type: "map", id: 25 },
    'name': 'Тепловая карта 1-й черверти доски',
    'fine': 1,
    'tags': [ tags.FIRST_QUARTER ]
  },
  {
    'id': 26,
    'handleHelp':{ type: "map", id: 26 },
    'name': 'Тепловая карта 2-й черверти доски',
    'fine': 1,
    'tags': [ tags.SECOND_QUARTER ]
  },
  {
    'id': 27,
    'handleHelp':{ type: "map", id: 27 },
    'name': 'Тепловая карта 3-й черверти доски',
    'fine': 1,
    'tags': [ tags.THIRD_QUARTER ]
  },
  {
    'id': 28,
    'handleHelp':{ type: "map", id: 28 },
    'name': 'Тепловая карта 4-й черверти доски',
    'fine': 1,
    'tags': [ tags.FORTH_QUARTER ]
  },
  {
    'id': 29,
    'handleHelp':{ type: "map", id: 29 },
    'name': 'Тепловая карта 1-й и 2-й червертей доски',
    'fine': 1,
    'tags': [ tags.FIRST_QUARTER, tags.SECOND_QUARTER ]
  },
  {
    'id': 30,
    'handleHelp':{ type: "map", id: 30 },
    'name': 'Тепловая карта 3-й и 4-й червертей доски',
    'fine': 1,
    'tags': [ tags.THIRD_QUARTER, tags.FORTH_QUARTER ]
  },
  {
    'id': 31,
    'handleHelp':{ type: "map", id: 31 },
    'name': 'Тепловая карта 1-й и 4-й червертей доски',
    'fine': 1,
    'tags': [ tags.FIRST_QUARTER, tags.FORTH_QUARTER ]
  },
  {
    'id': 32,
    'handleHelp':{ type: "map", id: 32 },
    'name': 'Тепловая карта 2-й и 3-й червертей доски',
    'fine': 1,
    'tags': [ tags.SECOND_QUARTER, tags.THIRD_QUARTER ]
  },
  {
    'id': 33,
    'handleHelp':{ type: "score", id: 33 },
    'name': 'Какой перевес в очках на данный момент?',
    'fine': 1
  },
  {
    'id': 34,
    'handleHelp':{ type: "score", id: 34 },
    'name': 'Кто побеждает на данный момент?',
    'fine': 1
  },
];
