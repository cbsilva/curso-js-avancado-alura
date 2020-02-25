class Negociacao {

    /**
     * Por convencao todos os metodos privates 
     * devem ter seus atributos iniciados com _ 'underline'
     * Estes atributos não podem ser acessados pela aplicação
     */

    constructor(data, quantidade, valor){
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    }

    /**
     * Metodo getVolume
     * Retorna o resultado de qtde * valor
     */
    getVolume() {
        return this._quantidade * this._valor;
    }

    getData(){
        return this._data;
    }

    getQuantidade(){
        return this._quantidade;
    }

    getValor(){
        return this._valor;
    }
}