if (!Array.prototype.includes) {

    // se não existir adiciona
    console.log('polyfill para Array.includes aplicado.');

    Array.prototype.includes = function(elemento) {
        return this.indexOf(elemento) != -1;
    }
}