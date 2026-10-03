App.loader = {
    cache: {},

    script(url) {
        if (App.loader.cache[url]) {
            return App.loader.cache[url];
        }

        App.loader.cache[url] = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.onload = resolve;
            script.onerror = () => {
                delete App.loader.cache[url];
                reject(new Error(url));
            };
            document.head.appendChild(script);
        });

        return App.loader.cache[url];
    },

    async load(name) {
        for (const url of App.config.LIBS[name]) {
            await App.loader.script(url);
        }
    }
};
