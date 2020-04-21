export class Negociacao {

    /**
     * Por convencao todos os metodos privates 
     * devem ter seus atributos iniciados com _ 'underline'
     * Estes atributos não podem ser acessados pela aplicação
     */

    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this);
    }

    /**
     * Metodo getVolume
     * Retorna o resultado de qtde * valor
     */
    get volume() {
        return this._quantidade * this._valor;
    }

    get data(){
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}