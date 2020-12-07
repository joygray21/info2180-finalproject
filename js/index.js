window.onload = function () {

    var xhr;

    //nav buttons
    var homeBtn = document.querySelector('#home');
    var addUserBtn = document.querySelector('#add_user');
    var newIssueBtn = document.querySelector('#new_issue');
    var logoutBtn = document.querySelector('#logout');

    //newUser page button
    var newUserBtn = document.querySelector('#new-user');

    //login page button
    var lgnBtn = document.querySelector('#lgn-btn');

    //issues page buttons
    var newIssueIPBtn = document.querySelector('#new-issue-btn');
    var byAllFilterBtn = document.querySelector('#byall');
    var byOpenFilterBtn = document.querySelector('#byopen');
    var byTicketsFilterBtn = document.querySelector('#bytickets');
    // var issueDescLink = document.querySelector('.iss-title').value;

    //createIssues page buttons
    var createIssueBtn = document.querySelector('#create-issue-btn');

    //fullDetails page buttons
    var closeBtn = document.querySelector('#close-btn');
    var progressBtn = document.querySelector('#prgrss-btn');
   
//nav functions
    homeBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();
        var url = "php/issues.php";

        xhr.onreadystatechange = updatePageTemplate; 
        xhr.open("GET", url);
            
        xhr.send();
    }
    
    addUserBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();
        var url = "php/newUserHtml.php";

        xhr.onreadystatechange = updatePageTemplate; 
        xhr.open("GET", url);
            
        xhr.send();
    }

    
    newIssueBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();
        var url = "php/createIssueHtml.php";

        xhr.onreadystatechange = updatePageTemplate; 
        xhr.open("GET", url);
            
        xhr.send();
    }

    logoutBtn.onclick = function(element){
        element.preventDefault();

        //logout
        xhr = new XMLHttpRequest();

        var url = "php/logout.php";
        xhr.onreadystatechange = updatePageTemplate; 
        xhr.open("GET", url);
        xhr.send();

        
        //login
        xhr = new XMLHttpRequest();

        var url = "php/loginHtml.php";
        xhr.onreadystatechange = updatePageTemplate; 
        xhr.open("GET", url);
        xhr.send();
    }

    function updatePageTemplate(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                var response = xhr.responseText;
                document.querySelector('.right-side').innerHTML = response;
            }
        }
    }


//newUser page functions
    newUserBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();
        var fname = document.querySelector('#fname');
        var lname = document.querySelector('#lname');
        var pword = document.querySelector('#pword');
        var email = document.querySelector('#email');

        if (validateForm(fname, lname, pword, email)){
            var url = "php/register.php";

            var fn = encodeURIComponent(fname.value.trim());
            var ln = encodeURIComponent(lname.value.trim());
            var pw = encodeURIComponent(pword.value.trim());
            var em = encodeURIComponent(email.value.trim());
            var parameters = "firstname=" + fn + "&lastname=" + ln + "&email" + em + "&password=" + pw;

            xhr.onreadystatechange = printSubmissionFeedback; 
            xhr.open("POST", url);
            
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(parameters);
        }
        // else{
        //     displayFeedback("There was an error with your request.")
        // }      
    }

    function displayFeedback(msg){
        document.querySelector('#message').innerHTML += msg;
        //alert(msg);
    }
    
    function validateForm(fname, lname, pword, email){
        valid = true;

        fnVal = fname.value.trim();
        lnVal = lname.value.trim();
        pwVal = pword.value.trim();
        emVal = email.value.trim();

        pswdExp = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        emailExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (fnVal.length == 0){
            displayFeedback("Enter first name.");
            fname.focus();
            valid = false;
        }

        if (lnVal.length == 0){
            displayFeedback("Enter last name.");
            lname.focus();
            valid = false;
        }
        
        if (pwVal.length == 0){
            displayFeedback("Enter a password.");
            pword.focus();
            valid = false;
        }
        else if (!pswdExp.test(pwVal)){
                displayFeedback("Password must be at least 8 characters and contain at least: one number, one letter, one uppercase letter.");
                pword.focus();
                valid = false;
        }
        
        
        if (emVal.length == 0){
            displayFeedback("Enter email.");       
            email.focus();
            valid = false;
        }
        else if (!emailExp.test(emVal)){
                displayFeedback("Please enter an email address in the format: email@example.com");
                email.focus();
                valid = false;
        }

        return valid;
    }
    

    function printSubmissionFeedback(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                displayFeedback("New user created.")
            }
            else{
                displayFeedback("There was an error processing your request.")
            }
        }
    }


//login page functions
    lgnBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();

        var email = document.querySelector('#email');
        var pword = document.querySelector('#pword');

        if (validateLogin(email, pword)){
            var url = "php/login.php?email=" + em;
            url += "&password=" + pw;

            xhr.onreadystatechange = printLoginFeedback; 
            xhr.open("GET", url);
            
            xhr.send();
        }
        // else{
        //     displayFeedback("There was an error with your request.")
        // }      
    }

    function displayFeedback(msg){
        document.querySelector('#wrg-pword').innerHTML += "<p>" + msg + "</p>";
        // alert(msg);
    }

    function validateLogin(email, pword){
        valid = true;

        emVal = email.value.trim();
        pwVal = pword.value.trim(); ``        

        pswdExp = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        emailExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


        if (emVal.length == 0){
            displayFeedback("Enter email.");       
            email.focus();
            valid = false;
        }
        // else if (!emailExp.test(emVal)){
        //         displayFeedback("Invalid email address.");
        //         email.focus();
        //         valid = false;
        // }
    
        if (pwVal.length == 0){
            displayFeedback("Enter a password.");
            pword.focus();
            valid = false;
        }
        // else if (!pswdExp.test(pwVal)){
        //         displayFeedback("Invalid password.");
        //         pword.focus();
        //         valid = false;
        // }
            
        return valid;
    }


    function printLoginFeedback(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                var response = xhr.responseText;
                if (response == "There is no user with that email" || response == "Invalid password."){
                    displayFeedback(response);                    
                }
                else{
                    document.querySelector('#wrg-pword').innerHTML = response;
                }
            }
            else{
                displayFeedback("There was an error processing your request.")
            }
        }
    }


//issues page functions
    //links to full descriptions
    issueDescLink.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();
        //get issue id
        var url = "php/issueDetails.php";
        //append issue id to  url
        
        xhr.onreadystatechange = printIssues; 
        xhr.open("GET", url);
            
        xhr.send();
    }


    //update styles for statuses - TBD


    newIssueIPBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();
        var url = "php/createIssueHTML.php";

        xhr.onreadystatechange = printIssues; 
        xhr.open("GET", url);
            
        xhr.send();
    }

    byAllFilterBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();

        var url = "php/issues.php?filter=All";

        xhr.onreadystatechange = printIssues; 
        xhr.open("GET", url);
            
        xhr.send();
    }

    byOpenFilterBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();

        var url = "php/issues.php?filter=Open";

        xhr.onreadystatechange = printIssues; 
        xhr.open("GET", url);
            
        xhr.send();
    }


    byTicketsFilterBtn.onclick = function(element){
        element.preventDefault();

        xhr = new XMLHttpRequest();

        var url = "php/issues.php?filter=Tickets";

        xhr.onreadystatechange = printIssues; 
        xhr.open("GET", url);
            
        xhr.send();
    }

    function printIssues(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                var response = xhr.responseText;
                document.querySelector('.main').innerHTML = response;
            }
        }
    }

//createIssues page functions
    createIssueBtn.onclick = function(element){
        xhr = new XMLHttpRequest();

        var title = document.querySelector('#issue_title');
        var desc = document.querySelector('#description');

        var url = "php/createIssue.php";

        var titleV = encodeURIComponent(title.value.trim());
        var descV = encodeURIComponent(desc.value.trim());
        var userVal = document.querySelector('#assigned').value;
        var typeVal = document.querySelector('#typeof').value;
        var priVal = document.querySelector('#priority').value;
        var parameters = "issue_title=" + titleV + "&issue_description=" + descV + "&assigned" + userVal + "&type=" + typeVal + "&priority=" + priVal ;

        xhr.onreadystatechange = printIssueFeedback; 
        xhr.open("POST", url);
        
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(parameters);

        xhr = new XMLHttpRequest();
        var url = "php/issues.php";

        xhr.onreadystatechange = updatePageTemplate; 
        xhr.open("GET", url);
            
        xhr.send();
    }

    function printIssueFeedback(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                
            }
        }
    }


//fullDetails page functions
    closeBtn.onclick = function(element){
        
    }



//////

    //calling register function
    // register();

    // login();
    // filterTable();
  
    
 

    
}


// function register(){

//     //jquery register on click
//     $('#newuser-submit').on('click', function(){

//         //retrieve values using dom
//         let fname = document.getElementById('fname').value;
//         let lname = document.getElementById('lname').value;
//         let pword = document.getElementById('pword').value;
//         let email = document.getElementById('email').value;




//         //send data to server
//         registerRequest(fname,lname,email,pword, function(data){
//             console.log(data)
//         });
 
         
//      });

// }

// function filterTable(){

//     //jquery register on click
//     $('#filter').on('click', function(){

//         issueTable("Open", function(data){
//             console.log(data);
//         });
 
         
//      });

// }

// function login(){

//     $('#login-submit').on('click', function(){

//         //retrieve values using dom
//         let pword = document.getElementById('pword').value;
//         let email = document.getElementById('email').value;




//         //send data to server
//         loginRequest(email,pword, function(data){
//             console.log(data)
//         });
 
         
//      });

// }


// function registerRequest(firstname,lastname,email,password,callback){
//     $.ajax({
//         url:"http://localhost:8080/php/register.php",
//         type: "POST",
//         data: {
//             firstname: firstname,
//             lastname:lastname,
//             email:email,
//             password:password
//         },
//         success: function (data){
//             callback(data)
//         }
//     })
// }

// function loginRequest(email,password,callback){
//     $.ajax({
//         url:"http://localhost:8080/php/login.php",
//         type: "GET",
//         data: {
//             email: email,
//             password:password
//         },
//         success: function (data){
//             callback(data)
//         }
//     })
// }

// function issueTable(filter,callback){
//     $.ajax({
//         url:"http://localhost/info2180-finalproject/php/issues.php",
//         type: "GET",
//         data: {
//             filter: filter
//         },
//         success: function (data){
//             callback(data)
//         }
//     })
// }