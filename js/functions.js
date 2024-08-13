//	Функция для проверки длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом
const isPalindrome = (string) => {
  const normalizeString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString[i];
  }
  return newString === normalizeString;
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры
// от 0 до 9 и возвращает их в виде целого положительного числа
// Если в строке нет ни одной цифры, функция должна вернуть NaN
// предусмотрите случай, когда вместо строки приходит число
// Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа
const getNumber = (string) => {
  const normalizeString = string.toString();
  let newString = '';
  for (let i = 0; i < normalizeString.length; i++) {
    if (parseInt(normalizeString[i], 10) >= 0) {
      newString += normalizeString[i];
    }
  }
  return parseInt(newString, 10);
};


getNumber('2023 год');// 2023
getNumber('ECMAScript 2022');// 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007');// 7
getNumber('а я томат');// NaN
getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5);// 15

//Напишите функцию, возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит

function convertToMinutes (time) {
  const [hours, minutes] = time.split(':');
  const minutesInHour = 60;

  return hours * minutesInHour + parseInt(minutes, 10);
}

function checkMeeting(dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartInMinutes = convertToMinutes(dayStart);
  const dayEndInMinutes = convertToMinutes(dayEnd);
  const meetingStartInMinutes = convertToMinutes(meetingStart);

  return meetingStartInMinutes >= dayStartInMinutes && meetingStartInMinutes + meetingDuration <= dayEndInMinutes;
}

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
checkMeeting('08:00', '17:30', '14:00', 90); // true
checkMeeting('8:0', '10:0', '8:0', 120); // true
checkMeeting('08:00', '14:30', '14:00', 90); // false
checkMeeting('14:00', '17:30', '08:0', 90); // false
checkMeeting('8:00', '17:30', '08:00', 900); // false
