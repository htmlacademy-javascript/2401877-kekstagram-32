//создать массив из 25 сгенерированных объектов
//id число от 1 до 25 не должны повторяться
//url photos/{{i}}.jpg, где {{i}} — это число от 1 до 25
//description строка — описание фотографии придумать самостоятельно
//likes Случайное число от 15 до 200
//comments - массив. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Состоит из
//id любое число не должны повторяться
//avatar img/avatar-{{случайное число от 1 до 6}}.svg
//message взять одно или два случайных предложения из представленных
//name массив имен придумать самостоятельно

const PICTURE_COUNT = 25;

const LIKES_MIN_COUNT = 15;

const LIKES_MAX_COUNT = 200;

const COMMENT_MIN_COUNT = 0;

const COMMENT_MAX_COUNT = 30;

const AVATAR_MIN_COUNT = 1;

const AVATAR_MAX_COUNT = 6;

const NAMES = [
  'Иван',
  'Дэн',
  'Мария',
  'Ева',
  'Саша',
  'Артём',
  'Андрей',
  'Анна',
  'Софи',
];

const DESCRIPTIONS = [
  'Лучшее место...',
  'Приключения только начинаются!)',
  'Чиллим с друзьями!!!',
  'Моя мечта исполнилась!',
  'Милота (* ^ ω ^)',
  'Как же тут вкусно',
  'Море - место силы',
  'Люблю порядок и комфорт (─‿‿─)♡',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

const createIdGenerator = () => {
  let numberId = 0;

  return () => {
    numberId += 1;
    return numberId;
  };
};

const generateRandomId = createIdGenerator();

const createMessage = () => Array.from(
  {length: getRandomInteger(1, 2)},
  () => getRandomArrayElement(COMMENT_MESSAGES),
).join(' ');

const createComment = () => ({
  id: generateRandomId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_COUNT, AVATAR_MAX_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from(
    {length: getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT)},
    createComment
  )
});

const getPictures = () => Array.from(
  {length: PICTURE_COUNT},
  (_, index) => createPicture(index + 1),
);

getPictures();
