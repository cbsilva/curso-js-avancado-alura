/**
 * Classe de view genérica 
 */
class View {

    constructor(elemento) {
        
        this._elemento = elemento;
    }

    template(){
        throw new Error('Esta classe precisa ser implementada');
    }

    /**
     * Metodo generico update template
     * @param {lista} model 
     */
    update(model) {

        return this._elemento.innerHTML = this.template(model);
    }
}