const getBtn = document.getElementById('modal');
const state = document.getElementById('statement_id');
const postBtn = document.getElementById('check');

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/json' } : {}
  }).then(response => {
    if (response.status >= 400) {
      return response.json().then(errResData => {
        const error = new Error('Something went wrong!');
        error.data = errResData;
        throw error;
      });
    }
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest('GET', 'http://desarrollo.cedantioquia.com/ced_api/web/index.php/api/statements/get-data-statement?type=palabras&statement_id=3')
  .then(responseData => {
 
    //console.log(responseData.lista_chequeo.length);

      for(let i  = 0; i < responseData.lista_chequeo.length; i++){
        let lista = responseData.lista_chequeo[i].name;
        var option = "A. logrado";
        var option1 = "B. Parcialmente logrado"
        var option2 = "C. No logrado "
        var contenedor = ''+
            '<ul class="todo" id="todo" >' + 
                '<li id="mostrar1"><p id="output">'+ lista + ' </p> <br>' +
                    '<div  class="select">' +

                            '<label class=""> ' +
                                '<p  style="margin-top: 15px;" class="show " id="option" >'+ option +'</p>' +
                                '<input type="checkbox" name="check" id="check" value="archived" onclick="onlyOne(this)" onchange="sendData(this)">'+
                                '<span class="checkmark"></span>' +
                              '</label><br>' +

                              '<label class="">'+
                                ' <p  style="margin-top: 15px;" class="show " id="option1"> '+ option1 + '</p>'+
                                  '<input type="checkbox"  name="check" id="check" value="partially_achieved"  onclick="onlyOne(this)" onchange="sendData(this)">'+
                                ' <span class="checkmark check2"></span>'+
                              '</label><br>'+ 
                              '<label class=""> '+
                                    '<p  style="margin-top: 15px;" class="show " id="option2" >'+option2 + '</p>'+
                                        '<input type="checkbox" name="check" id="check" value="unachieved"  onclick="onlyOne(this)" onchange="sendData(this)">'+
                                    '<span class="checkmark check3"></span>'+
                              '</label>'+
                          '</div>'+
                      '</li>'+
                '</ul>'+
          '</div> ' +
        '';
        $('#mostrar').append(contenedor)

        /*let option1 = "B. Parcialmente logrado"
        let option2 = "C. No logrado "
        */

        //$('#mostrar').append(contenedor);
        /*
        document.getElementById('option').innerHTML = option;
        document.getElementById('option1').innerHTML = option1;
        document.getElementById('option2').innerHTML = option2;
*/       
      
        console.log(responseData.lista_chequeo[i]);
      }

  })
  .catch(err => {
    console.log(err, err.responseData);
  });

};


function load() {
  sendHttpRequest('GET', 'http://desarrollo.cedantioquia.com/ced_api/web/index.php/api/statements/get-data-statement?type=palabras&statement_id=3')
  .then(responseData => {
      for(let i  = 0; i < responseData.enunciado.length; i++){
        let lista = responseData.enunciado[i].statement;
        var texttarea = ''+
        '<p value ="pk_id">'+ lista + ' </p>'
        '';
        $('#state').append(texttarea)
        console.log(lista);
      }

  })
  .catch(err => {
    console.log(err, err.responseData);
  });
}


window.onload = load;

function sendData(){
  sendHttpRequest('POST', 'http://desarrollo.cedantioquia.com/ced_api/web/index.php/api/statements/save-checklist', {
    user_id: 1,
    check_value: this.postBtn,
    statement_id: 3,
    check_id: 1
  })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
};

getBtn.addEventListener('click', getData);
state.addEventListener('click', getEnunciado);
postBtn.addEventListener('click');