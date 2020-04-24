var X = 1679583;
var Y = 77;

function AdditivePersistence(num) {
  var numbers = num.toString().split('');
  var count = 0;

  if (numbers.length <= 1) {
    return count;
  };

  do {
    var sum = 0;
    for (var i = 0; i<numbers.length; i++) {
      sum = sum + Number(numbers[i]);
    }
    numbers = sum.toString().split('');
    count = count + 1;
  } while (numbers.length > 1);

  return count;
};

function MuliplicativePersistence(num) {
  var times = 0;
  num = num.toString();
  while (num.length > 1) {
      times++;
      num = num.split('').map(Number).reduce((a, b) => a * b).toString();
  }
  return times;
}

console.log('Additive persistence of', X, 'is', AdditivePersistence(X), '!');
console.log('Muliplicative persistence of', Y, 'is', MuliplicativePersistence(Y), '!');