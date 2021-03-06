/**
 * declaracao de variaveis locais
 * Qdo utilizado const no ES6 não permite reatribuir valor
 */
const stores = ['negociacoes'];
const version = 6;
const dbName = 'aluraframe'

var connection = null;
var close = null;

//transforma classe em modulo
export class ConnectionFactory {

    constructor(){

        throw new Error('Não é possivel criar instancias de ConnectionFactory');
    }     

    static getConnection(){

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            }
            
            openRequest.onsuccess = e => {

            if (!connection) {
                connection = e.target.result;

                close = connection.close.bind(connection);

                //monkey patch
                connection.close = function(){
                    throw new Error('Você não pode fechar diretamente a conexão');
                }
            } 
                    
                resolve(connection);
                
            }
            
            openRequest.onerror = e => {
                console.log(e.target.error);
                
                reject(e.target.error.name);
            }
            
        });
        
    }
    
    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store))
            connection.deleteObjectStore(store);
            
            connection.createObjectStore(store, {autoIncrement:true});                    
        });

    }

    static closeConnection(){

    if (connection) {
        close();
        connection = null;
    }

    }


}




