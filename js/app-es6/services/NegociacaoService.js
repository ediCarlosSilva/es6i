class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {



        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                // console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            })

        /* estados possíveis de uma requisição AJAX */
        // 0: requisição ainda não iniciada

        // 1: conexão com o servidor estabelecida

        // 2: requisição recebida

        // 3: processando requisição

        // 4: requisição está concluída e a resposta está pronta



    }
    obterNegociacoesDaSemanaAnterior() {



        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            })


    }

    obterNegociacoesDaSemanaRetrasada() {



        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            })

    }

    obterNegociacoes() {

        return Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), []);

                return negociacoes;
            })
            .catch(erro => {
                throw new Error(erro);
            });
    }

    cadastra(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação cadastrada com sucesso.')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação.');
            });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações.');
            });
    }

    apaga() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações.');
            })
    }

    importa(listaAtual) {

        // usando o método recem criado na classe Negociacao para verificar se uma negociacao é igual a outra.
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Erro('Não foi possível importar as negociações.');
            })

        // usando JSON.stringify direto no then() usando metodo some() do array. sem usar o encapsulamento.
        // return this.obterNegociacoes()
        //     .then(negociacoes =>
        //         negociacoes.filter(negociacao =>
        //             !listaAtual.some(negociacaoExistente =>
        //                 JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
        //     )
        //     .catch(erro => {
        //         console.log(erro);
        //         throw new Erro('Não foi possível importar as negociações.');
        //     })
    }
}