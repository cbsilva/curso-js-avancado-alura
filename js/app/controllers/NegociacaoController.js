/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class NegociacaoController {

    constructor (){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvazia' 
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
        let xhr = new XMLHttpRequest ();

        /* Configuracoes
        caso a url fosse externa era preciso informar
        o caminho completo e não apenas negociacoes/semana
         */
        xhr.open('GET', 'negociacoes/semana');

        /* 
        Estados esperados durante uma requisicao AJAX
            0: requisição ainda não iniciada
            1: conexão com o servidor estabelecida
            2: requisição recebida
            3: processando requisição
            4: requisição está concluída e a resposta está pronta
        */

        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4){

                if (xhr.status == 200) {

                    JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                    this._mensagem.texto = "Negociações importadas com sucesso.";

                } else {

                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possivel obter as negociações do servidor.';
                }
            }

        }

        /*executa */
        xhr.send();
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
}