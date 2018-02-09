class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this.criaNegociacao();

        console.log(negociacao);

        this.limpaFormulario();

        // alert('Chamei ação no Controller');
        // console.log(this._inputData.value.split('-'));
        /* funcao mp com if */
        // let data = new Date(...this._inputData.value
        //     .split('-')
        //     .map(function(item, indice) {
        //         if (indice == 1) {
        //             return item - 1;
        //         }
        //         return item;
        //     })
        // );
        // console.log(data);
        // console.log(this._inputData.value.split('-'));
        // let data = new Date(this._inputData.value.split('-'));
        // let data = new Date(this._inputData.value.replace(/-/g, ','));
        // console.log(typeof(this._inputData.value));
        // console.log(this._inputData.value);
        // console.log(this._inputData.value);
        // console.log(this._inputQuantidade.value);
        // console.log(this._inputValor.value);
    }

    criaNegociacao() {

        let data = new Date(...this._inputData.value
            .split('-')
            .map((item, indice) => item - indice % 2)
        );

        return new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }
}