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
