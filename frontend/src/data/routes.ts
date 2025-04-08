export const routes = [
    "home",
    "dashboard",
    "products",
    "login",
    "signup",
    "cart",
    "logout",
].map((routeName) => {
    if (routeName === "home") {
        return {
            name: routeName,
            URL: `/`,
            guard: false,
            action: "anchor",
        };
    }
    if (routeName === "dashboard" || routeName === "cart") {
        return {
            name: routeName,
            URL: `/${routeName}`,
            guard: true,
            action: "anchor",
        };
    }
    if (routeName === "products") {
        return {
            name: routeName,
            URL: `${routeName}`,
            guard: false,
            action: "anchor",
            children: [
                {
                    name: "add Product",
                    URL: `/products/add`,
                    guard: false,
                    action: "anchor",
                },
            ],
        };
    }
    if (routeName === "logout") {
        return {
            name: routeName,
            URL: `/${routeName}`,
            guard: true,
            action: "button",
        };
    }
    return {
        name: routeName,
        URL: `/${routeName}`,
        guard: false,
        action: "anchor",
    };
});


