let loginstate = false;
function showlogin(){
    if(!loginstate){
        console.log(loginstate);
        document.getElementById("Home").style.display = "none";
        document.getElementById("Product").style.display = "none";
        document.getElementById("Map").style.display = "none";
        document.getElementById("Comments").style.display = "none";
        document.getElementById("News").style.display = "none";
        document.getElementById("Re").style.display = "none";
        document.getElementById("login").style.display = "block";
    }
    else{
        loginstate=false;
        document.getElementById("login_tab").innerHTML="Log in";
        Username="";
        Password="";
        alert("Log out success")
    }
}
const showReg = () =>{
    document.getElementById("login").style.display = "none"
    document.getElementById("Home").style.display = "none";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Map").style.display = "none";
    document.getElementById("Comments").style.display = "none";
    document.getElementById("News").style.display = "none"
    document.getElementById("Re").style.display = "block"
}
const showHome = () => {
    document.getElementById("login").style.display = "none"
    document.getElementById("Re").style.display = "none"
    document.getElementById("Home").style.display = "block";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Map").style.display = "none";
    document.getElementById("Comments").style.display = "none";
    document.getElementById("News").style.display = "none"

    
}
const showCart = () => {
    document.getElementById("Product").style.display = "block";
    document.getElementById("Home").style.display = "none";
    document.getElementById("Map").style.display = "none";
    document.getElementById("News").style.display = "none";
    document.getElementById("Comments").style.display = "none";
    document.getElementById("login").style.display = "none"
    document.getElementById("Re").style.display = "none"

    
}

const showMap = () => {
    document.getElementById("Map").style.display = "block";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Home").style.display = "none";
    document.getElementById("News").style.display = "none";
    document.getElementById("Comments").style.display = "none";
    document.getElementById("login").style.display = "none"
    document.getElementById("Re").style.display = "none"

    
}
const showNews = () => {
    document.getElementById("News").style.display = "block";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Home").style.display = "none";
    document.getElementById("Map").style.display = "none";
    document.getElementById("Comments").style.display = "none";
    document.getElementById("login").style.display = "none"
    document.getElementById("Re").style.display = "none"

    
};

const showComments = () => {
    document.getElementById("News").style.display = "none";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Home").style.display = "none";
    document.getElementById("Map").style.display = "none";
    document.getElementById("Comments").style.display = "block";

    
}


function searchProduct() {
    var p_Name = document.getElementById("ProductName").value;

    const fetchPromise = fetch('http://localhost:8188/DairyService.svc/search?term=' + p_Name,
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((a) => showOrder(a));
}


const showOrder = (orders) => {
    //alert(orders);
    const ourTab = document.getElementById("OurTable");
    let tableContent = "<h1 class=apro>Products</h1>";
    const addRecord = (record) => {
        tableContent +=
            "<tr><td>" + "<img src ='http://localhost:8188/DairyService.svc/itemimg?id=" + record.ItemId + "'width='300' height='300'/></td> <td>" + record.Title + "</td> <td>" + "$" + record.Price + "</td> <td>" + record.Origin + "</td>" + "<td>" + "<button type='button' onClick='buyGood("+record.ItemId+")'>"+"BUY"+"</button>" +"</td></tr>";
    };
    orders.forEach(addRecord);
    ourTab.innerHTML = tableContent;
};


const getProducts = () => {
    const fetchPromise = fetch('http://localhost:8188/DairyService.svc/items',
        {
            headers: {
                "Accept": "application/json"
            }
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((a) => showOrder(a));
};

const show_News = (news) => {
    console.log(news);
    const ourNew = document.getElementById("News");
    let content = '';
    const addNew = (record1) => {
        content += '<img src="' + record1.enclosureField.urlField + '"width=300 /><br><a href="' + record1.linkField + '">' + record1.titleField + '</a><br><p>' + record1.pubDateField + '</p><p>' + record1.descriptionField + '</p>';
    };
    news.forEach(addNew);
    ourNew.innerHTML = content;
};

const getNews = () => {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news',
        {
            headers: {
                "Accept": "application/json",
            }
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((b) => show_News(b));
};


const postComment = () => {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=' + document.getElementById("name").value,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(document.getElementById("comment").value)
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    document.getElementById("iframe").src = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/htmlcomments";
};

const postRegister = () =>{
    const fetchPromise = fetch('http://localhost:8188/DairyService.svc/register',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({Address:document.getElementById("ad").value,Name:document.getElementById("name1").value,Password:document.getElementById("ps").value})
        
        
    }).then(response => {
        return response.json()
    }).then((data) => {
        
        console.log(data);
        alert(data);
        
    });
    
    

};
let Username = "";
let Password = "";

function login(){
    Username = document.getElementById("logname").value;
    Password = document.getElementById("logps").value;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8189/Service.svc/user", true, Username, Password);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (this.status === 200) {
            loginstate = true;
            document.getElementById("login_tab").innerHTML="("+Username+") Logout";
            alert("Login Successful");
            document.getElementById("login").style.display = "none"
            document.getElementById("Re").style.display = "none"
            document.getElementById("Home").style.display = "block";
            document.getElementById("Product").style.display = "none";
            document.getElementById("Map").style.display = "none";
            document.getElementById("Comments").style.display = "none";
            document.getElementById("News").style.display = "none"

        }
    }
    xhr.send()
}



function buyGood(id){
    if(loginstate){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8189/Service.svc/buy?id=" + id, true, Username, Password);
		xhr.setRequestHeader("Content-type", "application/json");
        xhr.withCredentials = true;
        xhr.onload = function () {
			if (this.status === 200) { 
				alert(string(xhr.response));
			}
    
        }
        xhr.send();
    }
    else{
        document.getElementById("Home").style.display = "none";
        document.getElementById("Product").style.display = "none";
        document.getElementById("Map").style.display = "none";
        document.getElementById("Comments").style.display = "none";
        document.getElementById("News").style.display = "none"
        document.getElementById("Re").style.display = "none"
        document.getElementById("login").style.display = "block"
    }
    
}
function string(i){
	let doc = new DOMParser().parseFromString(i, 'text/html');
	return doc.body.textContent;
 }



window.onload = function () {
    getNews();
    showHome();
    
    getProducts();

};
