class Bind {
    constructor(model, props, view){

        let proxy = ProxyFactory.create(model, props, 
            model => {view.update(model)
        });

        view.update(model);


        return proxy;
    }
}