(() => {
    const App = {
        htmlElements: {
            form: document.getElementById('form'),
            N: document.getElementById('N'),
            output: document.getElementById('output')
        },
        init: () => {
            App.bindEvents();
        },
        bindEvents: () => {
            App.htmlElements.form.addEventListener("submit", App.Methods.onFormSubmit);
        },
        Methods: {
            onFormSubmit: (e) => {
                e.preventDefault();

                let N = 0;
                try {
                    N = parseInt(App.htmlElements.N.value);
                }
                catch (err) {
                    console.log("err", err);
                    App.htmlElements.output.innerHTML = "Ingrese un numero valido";
                    throw new Error("Ingrese un numero valido");
                }

                //validar que sea un numero
                if (isNaN(N)) {
                    console.log("El valor que ingreso no es numero");
                    App.htmlElements.output.innerHTML = "El valor que ingreso no es numero";
                    throw new Error("El valor que ingreso no es numero");
                }

                //validar que este en el rango
                if (N < 1 || N > 100) {
                    console.log("menor o mayor a 1")
                    App.htmlElements.output.innerHTML = "Ingrese un numero entre 1 y 100";
                    throw new Error("Ingrese un numero entre 1 y 100")
                }
                //sacar el factorial del numero en formato bigint por si colocan 100 ya que int no maneja numero tan grande
                let fact = BigInt(App.Methods.calcFactorial(N))

                //calcular la longitud de lo que se debe leer
                let i = String(fact).length;
                let sum = 0;
                //realizar la suma de todos los digitos de el factorial
                while (--i >= 0) {
                    //se tranforma a string para poder utilizar el chatat y conseguir el valor
                    sum += parseInt(String(fact).charAt(i))
                }
                //se muestra en pantalla el valor con el localestring(formato de panama en espanol) y tambien la sumatoria de los digitos
                App.htmlElements.output.innerHTML = `El factorial ${fact.toLocaleString('es-PA')} tiene una suma de: ${sum}`;
            },
            //esta funcion calcula el factorial con un while
            calcFactorial: (n) => {
                let fact = 1;
                while (n != 1) {
                    //se asegura que en la ultima iteracion se salga del loop para no multiplicar por 0
                    fact *= n--;
                }
                return fact;
            }
        }

    }
    App.init()
})()