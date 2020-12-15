let input = `0,5,4,1,10,14,7`.split(',').map(Number);
// input = `3,1,2`.split(',').map(Number);

let seen = {};

let index = 1;
let lastNumber = input[0];

while (true) {
    let val = lastNumber;

    if (index === 2020) {
        console.log(lastNumber);
        break;
    }

    if (index < input.length) {
        lastNumber = input[index];
    } else {
        if (seen[val] !== undefined) {
            lastNumber = index - seen[val];
        } else {
            lastNumber = 0;
        }
    }

    seen[val] = index;

    index++;
}