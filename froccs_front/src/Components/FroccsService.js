//FroccsService.js
import  axios from 'axios';

class FroccsService
{
    sendData(data)
    {
        
        axios.post('http://localhost:4200/froccs/add/post',
            {
                name : data.name,
                wine : data.wine,
                water : data.water,
                total_dl : data.total_dl,
                uploaded_by : data.email
            })
            .catch(function (error) {
                alert(error);
            });
    }

    

    delete(data)
    {
        axios.post('http://localhost:4200/froccs/delete/post',
            {
                froccs_id : data.delete_id,
                email: data.email,
                password: data.password
            })
            .then(console.log('Deleted')).catch(error => alert("Hiba"+error));

    }
}
export default FroccsService;