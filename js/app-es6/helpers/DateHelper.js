
export class DateHelper {
    constructor() {
        throw new Error('Esta classe não pode ser instanciada');        
    }

    /**
     * Metodo para converter um campo date em tipo string(texto)
     * @param {date} data 
     */
    static dataParaTexto(data) {
        //Aplicando template string
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    /**
     * Metodo para converter data em formato string para tipo date
     * @param {string} texto 
     */
    static textoParaData(texto) {
        if (!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('Data informada deve ser no formato AAAA-MM-DD.');
        
        //tratando a data com spread (...) operator
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }
}