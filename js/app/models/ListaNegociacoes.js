class ListaNegociacoes {

    constructor() {

        this._negociacoes = [];
    }

    /**
     * Metodo adiciona negociacao
     * @param {Array} negociacao 
     */

    adiciona(negociacao){

        this._negociacoes.push(negociacao);
    }

    esvazia(){
        this._negociacoes = [];
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
}