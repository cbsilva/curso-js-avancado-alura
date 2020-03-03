class MensagemView{

    constructor(elemento) {
        this._elemento = elemento;
        
    }

    _template(model){
        
        return model.texto ? `<div class="alert alert-primary" rola="alert">${model.texto}</div>` : `<div></div>`;
    }

    update(model){        
        this._elemento.innerHTML = this._template(model);
    }
}