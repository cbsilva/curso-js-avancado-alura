/**
 * Classe de view genérica 
 */
class View {

    constructor(elemento) {
        
        this._elemento = elemento;
    }

    /**
     * Metodo generico update template
     * @param {lista} model 
     */
    update(model) {

        return this._elemento.innerHTML = this._template(model);
    }
}