window.onload = function () {

    //calling register function
    register();

    login();
    filterTable();
  
    
 
}


function register(){

    //jquery register on click
    $('#newuser-submit').on('click', function(){

        //retrieve values using dom
        let fname = document.getElementById('fname').value;
        let lname = document.getElementById('lname').value;
        let pword = document.getElementById('pword').value;
        let email = document.getElementById('email').value;




        //send data to server
        registerRequest(fname,lname,email,pword, function(data){
            console.log(data)
        });
 
         
     });

}

function filterTable(){

    //jquery register on click
    $('#filter').on('click', function(){

        issueTable("Open", function(data){
            console.log(data);
        });
 
         
     });

}

function login(){

    $('#login-submit').on('click', function(){

        //retrieve values using dom
        let pword = document.getElementById('pword').value;
        let email = document.getElementById('email').value;




        //send data to server
        loginRequest(email,pword, function(data){
            console.log(data)
        });
 
         
     });

}


function registerRequest(firstname,lastname,email,password,callback){
    $.ajax({
        url:"http://localhost:8080/php/register.php",
        type: "POST",
        data: {
            firstname: firstname,
            lastname:lastname,
            email:email,
            password:password
        },
        success: function (data){
            callback(data)
        }
    })
}

function loginRequest(email,password,callback){
    $.ajax({
        url:"http://localhost:8080/php/login.php",
        type: "GET",
        data: {
            email: email,
            password:password
        },
        success: function (data){
            callback(data)
        }
    })
}

function issueTable(filter,callback){
    $.ajax({
        url:"http://localhost/info2180-finalproject/php/issues.php",
        type: "GET",
        data: {
            filter: filter
        },
        success: function (data){
            callback(data)
        }
    })
}