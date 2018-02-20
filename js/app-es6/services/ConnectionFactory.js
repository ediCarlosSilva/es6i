var ConnectionFactory = (function() {

    const stores = ['negociacoes'];
    const version = 2;
    const dbName = 'aluraframe';

    var connection = null;
    var close = null;

    return class ConnectionFactory {

        constructor() {

            throw new Error('Não é possível criar instãncias de ConnectionFactory');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);

                };

                openRequest.onsuccess = e => {

                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        // para usar Reflect.apply no método closeConnection():
                        // close = connection.close;
                        connection.close = function() {
                            throw new Error('Você não pode fechar diretamente a conexão.');
                        }
                    }

                    // recebe conexão já existente ou uma que acabou de ser criada.
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    reject(e.target.error.name);
                };

            });
        }

        static _createStores(connection) {

            // criando stores!

            stores.forEach(store => {

                if (connection.objectStoreNames.contains(stores)) connection.deleteObjectStore(store);

                connection.createObjectStore(store, { autoincrement: true });
            });
        }

        static closeConnection() {

            if (connection) {
                close();
                // Reflect.apply(close, connection, []);
                connection = null;
            }
        }
    }
})();