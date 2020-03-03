class MensagemView extends View{

    constructor(elemento) {
        super(elemento);        
    }

    _template(model){
        
        return model.texto ? `<div class="alert alert-primary" rola="alert">${model.texto}</div>` : `<div></div>`;
    }

 
}