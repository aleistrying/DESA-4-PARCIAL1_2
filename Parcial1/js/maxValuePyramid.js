(() => {
    const App = {
        htmlElements: {
            path: document.getElementById('path'),
            pyramid: document.getElementById('pyramid')
        },
        init: () => {
            App.Methods.loadMaxPyramid();
        },
        Methods: {
            loadMaxPyramid: () => {
                let input1 = "75 95 64 17 47 82 18 35 87 10 20 04 82 47 65 19 01 23 75 03 34 88 02 77 73 07 63 67 99 65 04 28 06 16 70 92 41 41 26 56 83 40 80 70 33 41 48 72 33 47 32 37 16 94 29 53 71 44 65 25 43 91 52 97 51 14 70 11 33 28 77 73 17 78 39 68 17 57 91 71 52 38 17 14 91 43 58 50 27 29 48 63 66 04 68 89 53 67 30 73 16 69 87 40 31 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23";
                let input2 = "3 7 4 2 4 6 8 5 9 3";
                let matrix = App.Methods.getMatrixFromTriangle(input1);
                // console.log("matrix1")
                // console.table(matrix)
                let solvedMatrix = App.Methods.getSolvedMatrix(App.Methods.copyMatrix(matrix), 0);
                // console.log("solved")
                // console.table(solvedMatrix)
                let maxLengthArr = App.Methods.getLongestPathArr(solvedMatrix, matrix);

                App.htmlElements.path.innerHTML = App.Methods.drawPath(maxLengthArr);
                App.htmlElements.pyramid.innerHTML = App.Methods.drawPyramid(matrix)
                // App.htmlElements.output.innerHTML = `El factorial ${fact.toLocaleString('es-PA')} tiene una suma de: ${sum}`;
            },
            /** retorna la matriz que viene de un string de triangulo. 
             *  @param {Matrix} Matriz de Piramide a resolver.
             *  @param {number} Orden de la matriz, accepta valores entre 0 y 1(o cualquier otro numero)
             *  @returns {Array} Matriz Bidimencional.
            */
            getMatrixFromTriangle(input) {
                //en este caso sera estatico el triangulo inicial 
                let array = input.split(/[ ]+/);
                let matrix = [];
                // console.log("input", input);
                let j = 1;
                //matrix stuff
                let accIndex = 0;
                while (true) {
                    accIndex += j;
                    if (accIndex > array.length) break;
                    matrix.push([]);
                    let i = 0;
                    while (i < j) {
                        try {
                            matrix[j - 1].push(parseInt(array[(accIndex - j) + i]))
                        }
                        catch (err) {
                            console.log(err)
                            throw new Error("Valor en el arreglo no es numero")
                        }
                        i += 1;
                    }
                    j += 1;
                }

                //making matrix
                let max = 0;
                i = 0;
                //conseguir la maxima longitud de linea
                while (i < matrix.length) {
                    if (max < matrix[i].length) max = matrix[i].length;
                    i++;
                }

                i = 0;
                //zero fill
                while (i < matrix.length) {
                    //para bajar la complejidad de n^2
                    j = matrix[i].length;
                    while (j < max) {

                        matrix[i].push(0);

                        j += 1;
                    }
                    i += 1;
                }
                // console.table(matrix)
                return matrix;
            },
            /** Retorna la matriz resulta con el MAXIMO o MINIMO 
             *  @param {Matrix} Matriz de Piramide a resolver.
             *  @param {number} Orden de la matriz, accepta valores entre 0 y 1.
             *  @returns {Array} Matriz Bidimencional.
            */
            getSolvedMatrix: (inputMatrix, orden) => {
                if (orden == null || typeof (orden) != "number") {
                    orden = 0;
                }
                let newMatrix = [...inputMatrix];


                let row = newMatrix.length - 1, col = 0, valueOfComparison;
                //vamos a loopear por cada row existente de la matriz
                while (row > 0) {
                    col = 0;
                    //luego loopeamos por cada valor de la columna menos el row que estamos.
                    // row 1 [1, 1, 0] nada mas loopeara por los valores de 1 y 1.
                    while (col < row) {
                        /*nos vamos a el row anterior y buscamos el
                         valor minimo en el row inferior */

                        if (orden == 0) {
                            valueOfComparison = App.Methods.getMaxVal(newMatrix[row][col], newMatrix[row][col + 1])

                        } else {
                            valueOfComparison = App.Methods.getMinVal(newMatrix[row][col], newMatrix[row][col + 1])
                        }
                        newMatrix[row - 1][col] += valueOfComparison;
                        col += 1;
                    }
                    row--;
                }

                return newMatrix;
            },
            getLongestPathArr(solvedMatrix, matrix) {
                let pathArray = [];
                let row = 0, col = 0, searchValue;//nos podemos saltar el primer row
                // let searchedValueet searchedValue = solvedMatrix[0][0] - matrix[0][0];
                // let i = 0, j = 0;
                //colocamos el primer valor (obvio) en el path como inicio.
                // pathArray.push(matrix[0][0]);
                while (row < solvedMatrix.length) {

                    pathArray.push(matrix[row][col])
                    searchValue = solvedMatrix[row][col] - matrix[row][col];

                    //el ultimo valor tiene como nulo la derecha asi que no se realiza.
                    if (row != solvedMatrix.length - 1) {
                        //si el valor es igual al que buscamos, entonces se cambia el col.
                        //por la forma de la piramide representada a la izq de  la matriz.
                        if (solvedMatrix[row + 1][col] != searchValue) {
                            col += 1
                        }

                        //si los valore de la izq y derecha son iguales, se deberia repetir esta
                        //funcion para buscar el arreglo por debajo de ellos a ver cual de ellos
                        //da la suma correcta al final.
                    }
                    row++;
                }
                // console.log(pathArray);
                return pathArray;
            },
            getMaxVal(a, b) {
                if (a > b) {
                    return a;
                }
                else {
                    return b;
                }
            },
            getMinVal(a, b) {
                if (a < b) {
                    return a;
                }
                else {
                    return b;
                }
            },
            copyMatrix: (matrix) => {
                let i = 0;
                let newMatrix = [];
                while (i < matrix.length) {
                    newMatrix.push([...matrix[i]])
                    i++;
                }
                return newMatrix;
            },
            drawPath: (pathArr) => {
                let i = 0;
                let drawnPath = "";
                while (i < pathArr.length - 1) {
                    drawnPath += `<span class="path-item">${pathArr[i]}</span><span class="path-item">&#10148;</span>`;
                    i++;
                }
                drawnPath += `<span class="path-item">${pathArr[pathArr.length - 1]}</span>`;

                return `${drawnPath}`;
            },
            drawPyramid: (matrix) => {

                let row = 0, col = 0,
                    level = "", pyramid = "";

                while (row < matrix.length) {

                    level = "";
                    col = 0;
                    while (col < row + 1) {
                        level += ` 
                        <div class="pyramid-item flex-row-centered">
                        ${matrix[row][col]}
                        </div>`;
                        col++;
                    }

                    pyramid += "<div class='flex-row-even'>" + level + "</div>";
                    row++;
                }

                return pyramid;
            }
        }

    }
    App.init()
})()