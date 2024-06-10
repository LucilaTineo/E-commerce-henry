import { LoginErrorProps, LoginProps, RegisterErrorProps, RegisterProps } from "@/types/IProducts";

export const validateLoginForm = (values: LoginProps): LoginErrorProps => {
    let errors : LoginErrorProps = {};
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(values.email)) {
        errors = {
            ...errors,
            email: "Ingrese un email valido",
        };
    }

    if (!passRegex.test(values.password)) {
        errors = {
            ...errors,
            password: "La longitud debe ser de al menos 8 caracteres, debe contener al menos una letra mayúscula y un número",
        };
    }

    return errors;
};

export const validateRegisterForm = (values: RegisterProps): RegisterErrorProps => {
    let errors: RegisterErrorProps = {};
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(values.email)) {
        errors = {
            ...errors,
            email: "Ingrese un email valido",
        };
    }

    if (!passRegex.test(values.password)) {
        errors = {
            ...errors,
            password: "La longitud debe ser de al menos 8 caracteres, debe contener al menos una letra mayúscula y un número",
        };
    }

    if (!values.name || !values.name.trim()) {
        errors.name = "Name is required";
    }

    if (!values.address || !values.address.trim()) {
        errors.address = "address is required";
    }

    return errors;
};