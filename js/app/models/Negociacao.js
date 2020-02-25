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
    get volume() {
        return this._quantidade * this._valor;
    }

    get data(){
        return this._data;
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}