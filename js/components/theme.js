App.theme = {
    button: null,

    init() {
        App.theme.button = document.getElementById("themeBtn");

        if (App.storage.getTheme() === "dark") {
            document.body.classList.add("dark");
        }

        App.theme.updateIcon();
        App.theme.button.addEventListener("click", App.theme.toggle);
    },

    toggle() {
        document.body.classList.toggle("dark");
        const dark = document.body.classList.contains("dark");
        App.storage.setTheme(dark ? "dark" : "light");
        App.theme.updateIcon();
    },

    updateIcon() {
        const dark = document.body.classList.contains("dark");
        App.theme.button.textContent = dark ? "☀" : "☾";
    }
};
