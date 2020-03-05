// eslint-disable-next-line no-unused-vars
class ListaNegociacoes {

    constructor(contexto,armadilha) {

        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }

    /**
     * Metodo adiciona negociacao
     * @param {Array} negociacao 
     */

    adiciona(negociacao){

        this._negociacoes.push(negociacao);
        //this._armadilha(this);
        Reflect.apply(this._armadilha, this._contexto, [this]);

    }
    
    /**
     * Metodos retorna lista de negociacoes
     */
    get negociacoes(){
        
        /* incluido array vazio antes do concat, para
        * blindar o metodo e não deixar o usuário incluir 
        * sujeira
        */
       return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
        //this._armadilha(this);
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }
}