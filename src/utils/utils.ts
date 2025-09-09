export function getEndingOfWord(amount: number) {
  const n = amount % 10;

  if (n === 1 && amount % 100 !== 11) {
    return '';
  } else if (n >= 2 && n <= 4 && (amount % 100 < 10 || amount % 100 >= 20)) {
    return 'а';
  } else {
    return 'ов';
  }
}
