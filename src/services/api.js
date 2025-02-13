const BASE_URL = "https://movetrack.develotion.com";

const login = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: username,
                password: password,
            }),
        });
        if (response.status == 200) {
            return response.json();
        }else{
            return Promise.reject("No se pudo iniciar sesion");
        }
    } catch (error) {
        return Promise.reject("No se pudo iniciar sesion");
    }
};

export {login};