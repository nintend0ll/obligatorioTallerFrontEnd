const BASE_URL = "https://movetrack.develotion.com/";

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
        if (response.status === 200) {
            console.log(response);
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
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify({
                usuario:username,
                password:password,
                idPais:country
            }),
        });
        if(response.status===200){
            console.log(response);
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
            headers: {
                "Content-type": "application/json"
            }
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

const getRegistros = async (id) => { 
    try {
        const response = await fetch (`${BASE_URL}/registros.php?idUsuario=${id}`); 
        if(response.status === 200) {
            return response.json();
        } else {
            return Promise.reject("Ha ocurrido un error");
        }
    } catch (error) {
        return Promise.reject("Ha ocurrido un error: "+ error);
    }
}


export {login, register, getCountries, getRegistros};