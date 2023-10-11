import { alertTitleClasses } from "@mui/material";
import config from "./config";

let urlAPI = config.serviceURL();

export default {
    login: async (user, pass) => {
        return fetch(urlAPI+'users/login', {
            method: 'POST',
            body: JSON.stringify({
                "user":user,
                "password":pass
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
    logout: async () => {
        return fetch(urlAPI+'users/logout', {
            method: 'POST',
            body: JSON.stringify({"id_user":localStorage.getItem('id_user')}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
    storeToken: ({ user, token, user_role, payroll, id_user, id_area, foto_user, id_department, id_plant }) => {
        localStorage.setItem('user', user)
        localStorage.setItem('token', token)
        localStorage.setItem('payroll', payroll)
        localStorage.setItem('id_user', id_user)
        localStorage.setItem('user_role', user_role)
        localStorage.setItem('id_area', id_area)
        localStorage.setItem('id_department', id_department)
        localStorage.setItem('foto_user', foto_user)
        localStorage.setItem('id_plant', id_plant)
    },
    deleteToken: () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('payroll')
        localStorage.removeItem('id_user')
        localStorage.removeItem('user_role')
        localStorage.removeItem('id_area')
        localStorage.removeItem('id_department')
        localStorage.removeItem('foto_user')
        localStorage.removeItem('id_plant')
    },
    getToken: () => {
        return localStorage.getItem('token')
    },
}