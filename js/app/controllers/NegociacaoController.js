class NegociacaoController {

    constructor (){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //Object.freeze(this);
    }


    adiciona(event) {        

        event.preventDefault();       
            
    
        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);

        console.log(DateHelper.dataParaTexto(negociacao.data)); 
                        
        this.limpaCampos();
    }

    limpaCampos() {

        let $ = document.querySelector.bind(document);

        let campos = [
            $('#data'),
            $('#quantidade'),
            $('#valor')
        ];

        campos[0].value = '';
        campos[1].value = 1;
        campos[2].value = 0;
    
        campos[0].focus();
    }    
}