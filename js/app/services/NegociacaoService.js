class NegociacaoService{
    obterNegociacaoDaSemana(callback){

        /**
         * A convenção é que cada callback receba sempre o erro no primeiro parâmetro. 
         * Na função callback, basta então verificar esse parâmetro para saber se ocorreu um erro ou não!
         * --------------------------------------
         * Exemplo:
        * fs = require('fs');
          fs.readFile('./arquivo.txt', function(erro, dados) {
            if(erro) {
                console.log('Um erro ocorreu');
                return;
            }
            console.log(dados);
          });
         */

        let xhr = new XMLHttpRequest ();

        /* Configuracoes
        caso a url fosse externa era preciso informar
        o caminho completo e não apenas negociacoes/semana
         */
        xhr.open('GET', 'negociacoes/semanax');

        /* 
        Estados esperados durante uma requisicao AJAX
            0: requisição ainda não iniciada
            1: conexão com o servidor estabelecida
            2: requisição recebida
            3: processando requisição
            4: requisição está concluída e a resposta está pronta
        */

        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4){

                if (xhr.status == 200) {

                    callback(null, JSON.parse(xhr.responseText)
                                   .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                } else {
                    console.log(xhr.responseText);
                    callback('Não foi possivel obter as negociações do servidor.');
                }
            }

        }

        /*executa */
        xhr.send();
    }
}