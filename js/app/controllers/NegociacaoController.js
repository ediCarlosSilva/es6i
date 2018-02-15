class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._ordemAtual = ''; // quando a página for carregada, não tem critério. Só passa a ter quando ele começa a clicar nas colunas

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        // this._NegociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        // this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();

        try {
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            // this._NegociacoesView.update(this._listaNegociacoes);
            this._mensagem.texto = 'Negociacao adicionada com sucesso';
            // this._mensagemView.update(this._mensagem);
            this._limpaFormulario();
        } catch (erro) {
            this._mensagem.texto = erro;
        }

    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        service
            .obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso.'
            })
            .catch(error => {
                console.log(error);
                this._mensagem.texto = error
            });

        /*
        service.obterNegociacoesDaSemana()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação da semana obtida com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação da semana obtida com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação da semana obtida com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);
        */


        /*
        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            if (erro) {
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
                if (erro) {
                    this._mensagem.texto = erro;
                    return;
                }

                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                    if (erro) {
                        this._mensagem.texto = erro;
                        return;
                    }

                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso.';
                });
            });
        });
        */
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            // inverte a ordem da lista
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;

    }



    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        // this._NegociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociações apagadas com sucesso.';
        // this._mensagemView.update(this._mensagem);
    }
}