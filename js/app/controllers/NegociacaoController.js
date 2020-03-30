/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class NegociacaoController {

    constructor (){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        //Quando a página for carregada, não tem critério. 
        //Só passa a ter quando ele começa a clicar nas colunas
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvazia','ordena', 'inverteOrdem'
        );        

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );       

    }

    /**
     * 
     * @param {*} event
     * Método adiciona negociacoes 
     */

    adiciona(event) {        

        event.preventDefault();     

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        //this._listaNegociacoes.negociacoes.push(this._criaNegociacao());       

        this._mensagem.texto = 'Negociação adicionada com sucesso!'; 
        this._limpaFormulario();                           
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociação apagada com sucesso!';       
        
    }

    importacoNegociacoes(){        
        
        let service = new NegociacaoService();

        Promise
            .all([
                service.obterNegociacaoDaSemana(),
                service.obterNegociacaoDaSemanaAnterior(),
                service.obterNegociacaoDaSemanaRetrasada()])
            .then(negociacoes => {
                negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso.';
            
        })
        .catch(erro => this._mensagem.texto = erro);            
    }

    
    /**
     * Método privado para criar negociacao
     */
    _criaNegociacao() {

        return new Negociacao(
               DateHelper.textoParaData(this._inputData.value),
               this._inputQuantidade.value,
               this._inputValor.value
        );
    }

    /**
     * Método privado para limpar formulário
     */

    _limpaFormulario() {

        this._inputData.value       = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value      = 0.0;

        this._inputData.focus();       
    } 

    /**
     * Ordena a negociacao conforme coluna
     * selecionada
     * @param {string} coluna 
     */
    
    ordena(coluna){
        if (this._ordemAtual = coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else  {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;

    }

    inverteOrdem() {
        this._listaNegociacoes.inverteOrdem();
    }
}