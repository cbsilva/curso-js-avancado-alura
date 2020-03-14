/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class NegociacaoController {

    constructor (){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            
            get(target, prop, receiver) {

                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    return function() {
                        console.log(`A propriedade "${prop}" foi interceptada.`);
                        
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);

                    }

                }

                return Reflect.get(target, prop, receiver);

            }   
            
        });

        /* removido para validar tratamento por proxy
        this._listaNegociacoes = new ListaNegociacoes(model => 
            this._negociacoesView.update(model));
        */

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem  = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

    }

    /**
     * 
     * @param {*} event
     * Método adiciona negociacoes 
     */

    adiciona(event) {        

        event.preventDefault();     

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._listaNegociacoes.negociacoes.push(this._criaNegociacao());
        //this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();                           
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        //this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociação apagada com sucesso!';
        this._mensagemView.update(this._mensagem);
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