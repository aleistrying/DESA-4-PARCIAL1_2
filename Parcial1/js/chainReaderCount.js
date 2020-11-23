(() => {
    const App = {
        htmlElements: {
            form: document.getElementById('form'),
            cadena: document.getElementById('cadena'),
            thead: document.getElementById('thead'),
            tbody: document.getElementById('tbody'),
        },
        init: () => {
            App.bindEvents();
        },
        bindEvents: () => {
            App.htmlElements.form.addEventListener("submit", App.Methods.onFormSubmit)
        },
        Methods: {
            onFormSubmit: (e) => {
                e.preventDefault();
                if (App.htmlElements.cadena.value == "") {
                    console.log("no ingreso valor")
                    App.htmlElements.tbody.innerHTML = "Ingrese un valor";
                    App.htmlElements.thead.innerHTML = "";
                    throw new Error("Ingrese un valor")
                }
                let res = App.Methods.countCharMap(App.htmlElements.cadena.value);
                let table = App.Methods.createTable(res);
                App.htmlElements.tbody.innerHTML = table;
                App.htmlElements.thead.innerHTML = `
                <tr class="center">
                    <th class="table-col">valor</th>
                    <th class="table-col">count</th>
                </tr>`
            },
            countCharMap: (val) => {
                //ordenar alfabeticamente
                let newVal = "";
                (App.Methods.bubbleSortArray(val.split(""))).forEach(elem => {
                    newVal += elem
                });
                val = newVal;


                let count = [],
                    keys = [],
                    i = 0;
                while (i != val.length) {
                    let index = keys.indexOf(val.charAt(i));

                    if (index == -1) {
                        keys.push(val.charAt(i))
                        count.push(1)
                    } else {
                        count[index] += 1;
                    }
                    i++;
                }
                console.log({ keys, count });
                return { keys, count }
            },
            createTable: (res) => {
                let i = 0, table = "";
                while (i < res.keys.length) {
                    table += `<tr class="center">
                                <td class="table-col">
                                    ${res.keys[i]}
                                </td>
                                <td class="table-col">
                                    ${res.count[i]}
                                </td>
                            </tr>`
                    i++;
                }
                return table;
            },
            bubbleSortArray: (toSort) => {
                let i = 0, j = 0, tmp;
                // va por todos los valores del arreglo - i que basicamente es la mitad
                while (i < toSort.length - 1) {
                    j = 0;
                    //va por todos los valores menos 1 porque estoy comparando 2 valores y el ultimo no se compara con nulo
                    while (j < toSort.length - i - 1) {
                        //si el valor actual es mayor al siguiente valor entonces se intercambian.
                        if (toSort[j] > toSort[j + 1]) {
                            tmp = toSort[j + 1]
                            toSort[j + 1] = toSort[j];
                            toSort[j] = tmp;
                        }
                        j += 1;
                    }
                    i += 1;
                }
                return toSort;
            },
        }


    }
    App.init();
})()