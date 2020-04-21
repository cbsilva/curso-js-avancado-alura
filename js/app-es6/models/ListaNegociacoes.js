// eslint-disable-next-line no-unused-vars
export class ListaNegociacoes {

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

    /**
     * Ordena a negociacao conforme coluna
     * selecionada
     * @param {string} criterio 
     */
    ordena(criterio){
        this._negociacoes.sort(criterio);
    }

    inverteOrdem(){
        this._negociacoes.reverse();
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
               
    }
}