class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            get(target, prop, receiver) {

                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    // console.log(typeof(target[prop]));
                    return function() {
                        console.log(`método "${prop}" interceptado`);

                        let retorno = Reflect.apply(target[prop], target, arguments);

                        // self._NegociacoesView.update(target);
                        acao(target);
                        return retorno;

                    }
                }

                //console.log(`valor anterior: ${target[prop]}, novo valor: ${value}`);
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    // target[prop] = value;
                    acao(target);
                }
                return retorno;
            }
        });
    }

    static _ehFuncao(func) {
        return typeof(func) == typeof(Function);
    }
}