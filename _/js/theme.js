
(() => {
    const storageKey = "antora-theme";

    function applyTheme(theme) {
        if (theme === "light" || theme === "dark") {
            document.documentElement.setAttribute("data-theme", theme);
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }

    // Restore saved preference.
    const savedTheme = localStorage.getItem(storageKey);
    applyTheme(savedTheme);

    // Listen for system theme changes when no manual preference exists.
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    systemTheme.addEventListener("change", () => {
        if (!localStorage.getItem(storageKey)) {
            applyTheme(null);
        }
    });

    // Expose a simple toggle for the UI.
    window.toggleAntoraTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const systemDark = systemTheme.matches;

        const effectiveTheme = current || (systemDark ? "dark" : "light");
        const nextTheme = effectiveTheme === "dark" ? "light" : "dark";

        localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
    };

    // Optional reset to system preference.
    window.resetAntoraTheme = function () {
        localStorage.removeItem(storageKey);
        applyTheme(null);
    };
})();
