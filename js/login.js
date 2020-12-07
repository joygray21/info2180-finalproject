window.onload = function(){
    var newUserBtn = document.querySelector('#new-user');
    var lgnBtn = document.querySelector('#lgn-btn');
    var xhr;

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
                    document.querySelector('#loginpge').innerHTML = response;
                }
            }
            else{
                displayFeedback("There was an error processing your request.")
            }
        }
    }
}

