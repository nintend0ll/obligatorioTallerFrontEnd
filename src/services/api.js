const BASE_URL = "https://movetrack.develotion.com";

const getUserData = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};

const HEADERS = () => {
    const userData = getUserData();
    return {
        "Content-Type": "application/json",
        "apikey": userData?.apiKey || "",
        "iduser": userData?.id || ""
    };
};

const login = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login.php`, {
            method: "POST",
            headers: HEADERS(),
            body: JSON.stringify({
                usuario: username,
                password: password,
            }),
        });
        if (response.status === 200) {
            
            return response.json();
        }else{
            return Promise.reject("No se pudo iniciar sesion");
        }
    } catch (error) {
        return Promise.reject("No se pudo iniciar sesion");
    }
};


const register = async(username, password, country) =>{
    try{
        const response = await fetch(`${BASE_URL}/usuarios.php`,
        {
            method:"POST",
            headers: HEADERS(),
            body: JSON.stringify({
                usuario:username,
                password:password,
                idPais:country
            }),
        });
        if(response.status===200){
            login(username, password);
            return response.json();
        }else{
            return Promise.reject("Ha ocurrido un error");
        }
    }catch(error){
        return Promise.reject("Ha ocurrido un error: "+ error);
    }
};

const getCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/paises.php`, {
            method: "GET",
            headers: HEADERS(),
        });
        const data = await response.json(); // Espera a que la promesa se resuelva
        if (data.codigo === 200) {
            return data.paises; // Devuelve el array de países
        } else {
            return Promise.reject("Ha ocurrido un error");
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

const getRegistros = async (iduser) => {
    try {
        const headers = HEADERS();
        console.log(headers)
        const response = await fetch(`${BASE_URL}/registros.php?idUsuario=${iduser}`, {
            method: "GET",
            headers: HEADERS(),
        });

        if (response.status === 200) {
            return response.json();
        } else {
            return Promise.reject("Ha ocurrido un error");
        }
    } catch (error) {
        return Promise.reject("Ha ocurrido un error: " + error);
    }
};

const getActividades = async() =>{
    try{
        const response = await fetch(`${BASE_URL}/actividades.php`,{
            method: "GET",
            headers : HEADERS(),
        });
        if(response.status===200){
            return response.json();
        }else{
            return Promise.reject("Ha ocurrido un error");
        }
    }catch(error){
        return Promise.reject("Ha ocurrido un error: "+error);
    }
};

const saveActividad = async (idActividad, idUsuario, tiempo, fecha) => {
    try {
        const response = await fetch(`${BASE_URL}/registros.php`, {
            method: "POST",
            headers: HEADERS(),
            body: JSON.stringify({ idActividad, idUsuario, tiempo, fecha })
        });
        if (response.status === 200) return response.json();
        return Promise.reject("Error al guardar la actividad");
    } catch (error) {
        return Promise.reject(`Error: ${error}`);
    }
};




export {login, register, getCountries, getRegistros, getActividades, saveActividad};