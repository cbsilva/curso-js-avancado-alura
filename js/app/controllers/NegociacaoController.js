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

        /**
         * tratando a data com spread operator
         */
        let data = new Date(...this._inputData.value.split('-')
                                   .map((item, indice) => item - indice % 2)
        );
    
        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);

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