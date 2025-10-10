

function setRow(matrix, i, n, m) {
    for (let j = 0; j < m; j++) {
        if (matrix[i][j] !== 0) {
            matrix[i][j] = -1;
        }
    }
}