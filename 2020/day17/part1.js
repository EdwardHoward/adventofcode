console.time("part 1");
let input = `.##..#.#
#...##.#
##...#.#
.##.##..
...#.#.#
.##.#..#
...#..##
###..##.`.split(/\n/).map(n => {
    return n.split('').map(f => [f]);
});

const tileDict = {};

for (var y = 0; y < input.length; y++) {
    for (var x = 0; x < input[0].length; x++) {
        for (var z = 0; z < input[0][0].length; z++) {

            if (input[y][x][z] === '#') {
                tileDict[y + ',' + x + ',' + z] = '#';
            }
        }
    }
}

let saved = JSON.parse(JSON.stringify(tileDict));
let current = JSON.parse(JSON.stringify(tileDict));

for (var i = 0; i < 6; i++) {
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;

    let minX = 0;
    let minY = 0;
    let minZ = 0;

    Object.keys(saved).map((n) => {
        let [y, x, z] = n.split(',').map(Number);

        if (y > maxY) {
            maxY = y;
        }

        if (x > maxX) {
            maxX = x;
        }

        if (z > maxZ) {
            maxZ = z;
        }

        if (y < minY) {
            minY = y;
        }

        if (x < minX) {
            minX = x;
        }

        if (z < minZ) {
            minZ = z;
        }
    })

    for (var y = minY - 2; y <= maxY + 2; y++) {
        for (var x = minX - 2; x < maxX + 2; x++) {
            for (var z = minZ - 2; z < maxZ + 2; z++) {
                const tile = saved[y + ',' + x + ',' + z] || '.';
                const neighbors = getNeighbors(y, x, z);

                if (tile === '#') {
                    // active
                    if (neighbors !== 2 && neighbors !== 3) {
                        delete current[y + ',' + x + ',' + z]
                    }
                } else {
                    // inactive
                    if (neighbors === 3) {
                        current[y + ',' + x + ',' + z] = '#';
                    }
                }
            }
        }
    }

    saved = JSON.parse(JSON.stringify(current));
}

console.log('Answer:', Object.values(saved).join('').length);

function getNeighbors(y, x, z) {
    let neighbors = 0;
    for (var yy = -1; yy <= 1; yy++) {
        for (var xx = -1; xx <= 1; xx++) {
            for (var zz = -1; zz <= 1; zz++) {
                let yyy = y + yy;
                let xxx = x + xx;
                let zzz = z + zz;

                if (xx === 0 && yy === 0 && zz === 0) {
                } else {
                    let tile = saved[yyy + ',' + xxx + ',' + zzz];

                    if (tile === '#') {
                        neighbors++;
                    }
                }
            }
        }
    }

    return neighbors;
}

console.timeEnd("part 1");