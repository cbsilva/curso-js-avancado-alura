class NegociacoesView {

    
    constructor(elemento) {
        
        this._elemento = elemento;
    } 

    /**
     * Metodo template tabela negociacoes
     */

    _template() {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
            </tbody>
            
            <tfoot>
            </tfoot>
        </table>`;
    }

    /**
     * Metodo atualiza tabela de negociacoes
     */

    update() {

        return this._elemento.innerHTML = this._template();

    }


    
}