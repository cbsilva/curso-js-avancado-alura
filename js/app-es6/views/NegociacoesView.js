class NegociacoesView extends View{

    constructor(elemento) {
        super(elemento);        
    }   
    

     /**
      * Metodo template tabela negociacoes
      * @param {lista} model 
      */

    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onClick="negociacaoController.ordena('data')">DATA</th>
                    <th onClick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onClick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onClick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>            
            <tbody>
                ${model.negociacoes.map(n => `
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                `).join('')}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>
                    ${model.negociacoes.reduce((total, n) => total += n.volume, 0.0)}
                </td>
            </tfoot>
        </table>`;
    }    
}