/**
 * Classe de view genérica 
 */
class View {

    constructor(elemento) {
        
        this._elemento = elemento;
    }

    template(){
        throw new Error('O método template deve ser implementado');
    }

    /**
     * Metodo generico update template
     * @param {lista} model 
     */
    update(model) {

        return this._elemento.innerHTML = this.template(model);
    }
}