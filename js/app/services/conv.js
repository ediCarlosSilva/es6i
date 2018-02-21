'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var formatadorDeMoedas;
    return {
        setters: [],
        execute: function () {
            formatadorDeMoedas = function () {

                var simboloMoeda = 'R$ ';
                var modulo = {};

                modulo.numeroParaReal = function (numero) {

                    return simboloMoeda + numero.toFixed(2).replace('.', ',');
                };

                modulo.realParaNumero = function (texto) {

                    return texto.replace(simboloMoeda, '').replace(',', '.');
                };

                return modulo;
            }();
        }
    };
});
//# sourceMappingURL=conv.js.map