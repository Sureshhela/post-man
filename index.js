console.log("post man");

/* source code */

//utility function...

// get DOM element from string...
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Initialize number parameters...
let addParamscont = 0;

// hide the parameter box initially
let parameterBox = document.getElementById('parametersBox');
parameterBox.style.display = 'none';

//if the user select custom parameters hide the json box...
let customParams = document.getElementById('customParams');
customParams.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('requstJsonBox').style.display = 'none';
})

//if the user select json box hide the json box custom parameters...
let jasonValue = document.getElementById('jasonValue');
jasonValue.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requstJsonBox').style.display = 'block';
})

//If the user clicks on + button add more parameters...
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row g-2">
                        <label for="paramsBox" class="col-sm-2 col-form-label">
                            <h5><b>Parameter ${addParamscont + 2}</b></h5>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${addParamscont + 2}" placeholder="Parameter Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${addParamscont + 2}" placeholder="Parameter Value">
                        </div>
                        <button class="btn btn-outline-danger col-1 deleteParams my-2 mx-2" type="button">-</button>
                    </div>`;
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    addParamscont++;
    //Add event listner to remove the parameter by clicking on the - button...
    let deleteParams = document.getElementsByClassName('deleteParams');
    for (item of deleteParams) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
})

//if the user clicks on submit button...
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // please wait promt...
    // document.getElementById('resposeJsonText').value = "please wait fetching response...";
    document.getElementById('responseCode').innerHTML = "please wait fetching response...";

    //fetch all the values user has enterd...
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value

    //log all the values for debugging...
    /* console.log('url is '+url,'requestype '+requestType,'contentype '+contentType); */

    // if user has selected params instead of jeson then collect all the pramaters in an object...
    if (contentType == 'params') {
        data = {};
        for (i = 0; i <= addParamscont + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }

    else {
        data = document.getElementById('requestJsonText').value;
    }
    /* console.log('url is '+url,'requestype '+requestType,'contentype '+contentType,'data ='+data); */

    // if request type is post...

    //if request type is get...
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('resposeJsonText').value = text;
                document.getElementById('responseCode').innerHTML = text;
                Prism.highlightAll();
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('resposeJsonText').value = text;
                document.getElementById('responseCode').innerHTML = text;
                Prism.highlightAll();
            })
    }
});