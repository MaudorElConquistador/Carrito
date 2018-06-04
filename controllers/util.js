var val = {
    validateName: name => {
        if (name.length < 3)
            return "El nombre debe contener al menos 3 caracteres";
        if (name.length > 30)
            return "El nombre debe contener como máximo 45 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜïÏ ]+$/.test(name))
            return "El nombre sólo puede contener caracteres correspondientes al alfabeto español";
        return false;
    },
    validatePassword: password => {
        if (password.length < 5)
            return "La contraseña debe contener al menos 10 caracteres";
        if (password.length > 18)
            return "La contraseña debe contener como máximo 45 caracteres";
        return false;
    },
    validateDinero: dinero =>{
        if(parseFloat(dinero) < 0)
           return "Por favor ingresa un valor positivo";
        if(parseFloat(dinero) > 3000000000000)
           return "No puedes ingresar con tanto dinero";
        return false;
    }
}
module.exports = val;
