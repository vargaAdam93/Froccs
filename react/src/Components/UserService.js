//UserService.js
import  axios from 'axios';

class UserService
{
    sendData(data)
    {
        axios.post('http://localhost:4200/users/register/post',
            {
                name: data.name,
                email: data.email,
                password: data.password
            })
            .then(function (response) {
                alert(response);
            })
            .catch(function (error) {
                alert(error);
            });
    }
    login(data)
    {
       alert(data.email);
        axios.post('http://localhost:4200/users/login/post',
           {
               email: data.email,
               password: data.password
           })
           .then(function (response) {
               alert(response.data.name);
           })
           .catch(function (error) {
               alert(error.toString());
           });
    }
}
export default UserService;