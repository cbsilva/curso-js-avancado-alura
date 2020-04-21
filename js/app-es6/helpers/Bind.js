export class Bind {
    
    /**
     * Para se aplicar o rest operator o parametro deve
     * ser sempre o ultimo no construtor
     */
    constructor(model, view, ...props){

        let proxy = ProxyFactory.create(model, props, 
            model => {view.update(model)
        });

        view.update(model);


        return proxy;
    }
}