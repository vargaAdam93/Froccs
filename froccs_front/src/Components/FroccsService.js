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
                other_name : data.other_name,
                uploaded_by : data.email
            })
            .then(function (response) {
                alert(response.data);
            })
            .catch(function (error) {
                alert(error);
            });
    }
}
export default FroccsService;