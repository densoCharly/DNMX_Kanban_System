import config from "./config";

let urlAPI = config.serviceURL();

export default {

    getAllUsers: async () => {
        return fetch(urlAPI+'users/getList', {method:'GET'})
        .then(res => res.json())
    },

    getUser: async () => {
        return fetch(urlAPI+'users/getUser/' + localStorage.getItem('id_user'), {method:'GET'})
        .then(res => res.json())
    },

    getUserDepartment: async (id) => {
        return fetch(urlAPI+'users/getUserDepartment/' + id, {method:'GET'})
        .then(res => res.json())
    },

    saveUser: async (user) => {
        let formData = new FormData();
        formData.append('name', user.name);
        formData.append('f_surname', user.f_surname);
        formData.append('m_surname', user.m_surname);
        formData.append('mail', user.mail);
        formData.append('password', user.password);
        formData.append('payroll', user.payroll);
        formData.append('id_employee', user.id_employee);
        formData.append('id_plant', user.id_plant);
        formData.append('id_department', user.id_department);
        formData.append('foto_user', user.foto_user);
        formData.append('status', 1);
        formData.append('tel', user.tel);
        formData.append('id_area', user.id_area);
        return fetch(urlAPI+'users/insert', {
            method: 'POST',
            body: formData,
            headers: {
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    editUser: async (user) => {
        let formData = new FormData();
        formData.append('id_user', user.id_user);
        formData.append('name', user.name);
        formData.append('f_surname', user.f_surname);
        formData.append('m_surname', user.m_surname);
        formData.append('mail', user.mail);
        formData.append('password', user.password);
        formData.append('tel', user.tel);
        formData.append('foto_user', user.foto_user);
        return fetch(urlAPI+'users/editUser/' + user.id_user, {
            method: 'POST',
            body: formData,
            headers: {
                
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateUser: async (user) => {
        return fetch(urlAPI+'users/update/' + user.id_user, {
            method: 'POST',
            body: JSON.stringify({
                "name":user.name,
                "f_surname":user.f_surname,
                "m_surname":user.m_surname,
                "payroll":user.payroll,
                "mail":user.mail,
                "password":user.password,
                "status":1,
                "id_employee":user.id_employee,
                "id_plant":user.id_plant,
                "id_department":user.id_department,
                "tel":user.tel,
                "id_area":user.id_area,
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteUser: async (id) => {
        return fetch(urlAPI+'users/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getEmployees: async () => {
        return fetch(urlAPI+'employee/getList', {method:'GET'})
        .then(res => res.json())
    }
}