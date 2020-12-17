console.time("part 2");
let input = `.##..#.#
#...##.#
##...#.#
.##.##..
...#.#.#
.##.#..#
...#..##
###..##.`.split(/\n/).map(n => {
    return n.split('').map(f => [[f]]);
});

const tileDict = {};
const queue = [];

for (var y = 0; y < input.length; y++) {
    for (var x = 0; x < input[0].length; x++) {
        for (var z = 0; z < input[0][0].length; z++) {
            for (var w = 0; w < input[0][0][0].length; w++) {
                if (input[y][x][z][w] === '#') {
                    tileDict[y + ',' + x + ',' + z + ',' + w] = '#';
                }
            }
        }
    }
}

let saved = JSON.parse(JSON.stringify(tileDict));
let current = JSON.parse(JSON.stringify(tileDict));

for (var i = 0; i < 6; i++) {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    let maxW = -Infinity;

    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let minW = Infinity;

    Object.keys(saved).map((n) => {
        let [y, x, z, w] = n.split(',').map(Number);

        if (y > maxY) {
            maxY = y;
        }

        if (x > maxX) {
            maxX = x;
        }

        if (z > maxZ) {
            maxZ = z;
        }

        if (w > maxW) {
            maxW = w;
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

        if (w < minW) {
            minW = w;
        }
    })

    for (var y = minY - 2; y <= maxY + 2; y++) {
        for (var x = minX - 2; x < maxX + 2; x++) {
            for (var z = minZ - 2; z < maxZ + 2; z++) {
                for (var w = minW - 2; w < maxW + 2; w++) {
                    const tile = saved[y + ',' + x + ',' + z + ',' + w] || '.';
                    const neighbors = getNeighbors(y, x, z, w);

                    if (tile === '#') {
                        // active
                        if (neighbors !== 2 && neighbors !== 3) {
                            delete current[y + ',' + x + ',' + z + ',' + w]
                        }
                    } else {
                        // inactive
                        if (neighbors === 3) {
                            current[y + ',' + x + ',' + z + ',' + w] = '#';
                        }
                    }
                }
            }
        }
    }

    saved = JSON.parse(JSON.stringify(current));
}

console.log('Answer:', Object.values(saved).join('').length);

function getNeighbors(y, x, z, w) {
    let neighbors = 0;
    for (var yy = -1; yy <= 1; yy++) {
        for (var xx = -1; xx <= 1; xx++) {
            for (var zz = -1; zz <= 1; zz++) {
                for (var ww = -1; ww <= 1; ww++) {
                    let yyy = y + yy;
                    let xxx = x + xx;
                    let zzz = z + zz;
                    let www = w + ww;

                    if (xx === 0 && yy === 0 && zz === 0 && ww === 0) {
                    } else {
                        let tile = saved[yyy + ',' + xxx + ',' + zzz + ',' + www];

                        if (tile === '#') {
                            neighbors++;
                        }
                    }
                }
            }
        }
    }

    return neighbors;
}

console.timeEnd("part 2");