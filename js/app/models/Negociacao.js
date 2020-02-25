class Negociacao {

    constructor(data, quantidade, valor){
        this.data = data;
        this.quantidade = quantidade;
        this.valor = valor;
    }

    /**
     * Metodo obtemVolume
     * Retorna o resultado de qtde * valor
     */
    obtemVolume() {
        return this.quantidade * this.valor;
    }
}