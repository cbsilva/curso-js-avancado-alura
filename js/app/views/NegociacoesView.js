class NegociacoesView {

    
    constructor(elemento) {
        
        this._elemento = elemento;
    } 

     /**
      * Metodo template tabela negociacoes
      * @param {lista} model 
      */

    _template(model) {
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
                ${model.negociacoes.map(n => {
    
                    return `
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>`
                }).join('')}
            </tbody>
            
            <tfoot>
            </tfoot>
        </table>`;
    }

    /**
     * Metodo atualiza tabela de negociacoes
     * @param {lista} model 
     */

    update(model) {

        return this._elemento.innerHTML = this._template(model);

    }


    
}