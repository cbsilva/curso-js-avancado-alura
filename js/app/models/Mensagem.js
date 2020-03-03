class Mensagem {

    constructor(texto='Mensagem default') {

        this._texto = texto;
        
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        return this._texto = texto;
    }
}