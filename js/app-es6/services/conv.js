var formatadorDeMoedas = (function() {

    let simboloMoeda = 'R$ ';
    let modulo = {};

    modulo.numeroParaReal = numero => {

        return simboloMoeda + numero.toFixed(2).replace('.', ',');
    }

    modulo.realParaNumero = texto => {

        return texto.replace(simboloMoeda, '').replace(',', '.');
    }

    return modulo;
})();