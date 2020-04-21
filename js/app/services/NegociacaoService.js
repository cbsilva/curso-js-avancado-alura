class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }
    
    obterNegociacoesDaSemana() {       
        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));                  
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel importar as negociações da semana');
        });
              
    }

    obterNegociacoesDaSemanaAnterior(){
    
        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));                  
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel importar as negociações da semana anterior');
        });        
    }

    obterNegociacoesDaSemanaRetrasada(){
        
        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));                
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel importar as negociações da semana retrasada');

        });        
    }

    obterNegociacoes() {
        return Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()])
            .then(periodos => {

                let negociacoes = periodos
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));
                return negociacoes;
            }).catch(erro => {
                throw new Error(erro)
            });
    }

    cadastra(negociacao) {

        return ConnectionFactory
               .getConnection()
               .then(conexao => new NegociacaoDao(conexao))
               .then(dao => dao.adiciona(negociacao))
               .then(() => 'Negociação adicionada com sucesso!')
               .catch(erro => {
                   console.log(erro);
                   throw new Error ('Não foi possivel adicionar negociação')
               });
    }

    apaga() {
        return ConnectionFactory
                .getConnection()
                .then(conexao => new NegociacaoDao(conexao))
                .then(dao => dao.apagaTodos())
                .then(() => 'Negociações apagadas com sucesso!')
                .catch(erro => {
                    console.log(erro)
                    throw new Error('Não foi possivel apagar as negociações')
                });
    }

    lista(){
        return ConnectionFactory
                .getConnection()
                .then(conexao => new NegociacaoDao(conexao))
                .then(dao => dao.listaTodos())
                .catch(erro => {
                    console.log(erro)
                    throw new Error('Não foi possivel listar as negociações')
                });
    }

    importa(listaAtual){
        return this.obterNegociacoes()   
                .then(negociacoes => 
                      negociacoes.filter(negociacao => 
                        !listaAtual.some(negociacaoExistente =>
                            JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
                ).catch(erro => {
                    console.log(erro)
                    throw new Error('Erro ao importar negociações')
                });

    }
}