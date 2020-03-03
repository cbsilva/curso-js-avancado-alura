
class DateHelper {
    constructor() {
        throw new Error('Esta classe não pode ser instanciada');        
    }

    static dataParaTexto(data) {
        console.log('Data para texto ', data);
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        if (!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('Data informada deve ser no formato AAAA-MM-DD.');
        
        //tratando a data com spread (...) operator
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }
}