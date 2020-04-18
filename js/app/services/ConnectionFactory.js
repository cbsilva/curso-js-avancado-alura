/**
 * comando para chamar classe no browser
 * apagar depois dos testes
 * ConnectionFactory.getConnection().then(connection => console.log(connection));
 */

 var ConnectionFactory = (function () {

    /**
     * declaracao de variaveis locais
     */
    var stores = ['negociacoes'];
    var version = 6;
    var dbName = 'aluraframe'
    var connection = null;

     //transforma classe em modulo
     return class ConnectionFactory {
     
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
     
                     if (!connection) connection = e.target.result;
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
     
     
     }
 }) ();



