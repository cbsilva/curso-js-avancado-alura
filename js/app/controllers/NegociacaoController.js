class NegociacaoController {

    constructor (){

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvazia','ordena', 'inverteOrdem'
        );        
            
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),'texto'
        );   
            
        //Quando a página for carregada, não tem critério. 
        //Só passa a ter quando ele começa a clicar nas colunas
        this._ordemAtual = '';
        this._service = new NegociacaoService();

        this._init();

       
    }

    _init() {

        this._service   
            .lista()     
            .then(negociacoes => negociacoes.forEach(negociacao => 
                this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
                
            });           

        setInterval(() => {
            this.importacoNegociacoes();            
        }, 5000);

    }

    /**
     * 
     * @param {*} event
     * Método adiciona negociacoes 
     */

    adiciona(event) {        

        event.preventDefault();  

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto  = mensagem;
                this._limpaFormulario();
            }).catch(erro => this._mensagem.texto = erro);       
             
    }

    apaga(){        

        this._service
            .apaga()
            .then(mensagem => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = mensagem;       

            }).catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });      
    }

    importacoNegociacoes(){    
        
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações importadas com sucesso.';
            })).catch(erro => this._mensagem.texto = erro);                   
    }

    
    /**
     * Método privado para criar negociacao
     */
    _criaNegociacao() {

        return new Negociacao(
               DateHelper.textoParaData(this._inputData.value),
               parseInt(this._inputQuantidade.value),
               parseFloat(this._inputValor.value)
        );
    }

    /**
     * Método privado para limpar formulário
     */

    _limpaFormulario() {

        this._inputData.value       = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value      = 0.0;

        this._inputData.focus();       
    } 

    /**
     * Ordena a negociacao conforme coluna
     * selecionada
     * @param {string} coluna 
     */
    
    ordena(coluna){
        if (this._ordemAtual = coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else  {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;

    }

    inverteOrdem() {
        this._listaNegociacoes.inverteOrdem();
    }
}