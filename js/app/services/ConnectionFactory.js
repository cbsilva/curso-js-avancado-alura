class ConnectionFactory {

    constructor(){

        throw new Error('Não é possivel criar instancias de ConnectionFactory');
    }


    static getConnection(){

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open('aluraframe', 6);

            openRequest.onupgradeneeded = e => {
                if (e.target.result.objectStoreNames.contains('negociacoes'))
                    e.target.result.deleteObjectStore('negociacoes');
                
                e.target.result.createObjectStore('negociacoes', {autoIncrement:true});

            }

            openRequest.onsuccess = e => {
               resolve(e.target.result);

            }

            openRequest.onerror = e => {
                console.log(e.target.error);

                reject(e.target.error.name);
            }

        });

    }


}