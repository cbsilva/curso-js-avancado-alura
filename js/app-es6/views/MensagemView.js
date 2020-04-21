class MensagemView extends View{

    constructor(elemento) {
        super(elemento);        
    }

    
    template(model){
        
        return model.texto ? `<div class="alert alert-primary" rola="alert">${model.texto}</div>` : `<div></div>`;
    }
    

 
}