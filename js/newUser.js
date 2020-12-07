window.onload = function(){
    var newUserBtn = document.querySelector('#new-user');
    var xhr;

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
        // document.querySelector('#').innerHTML += msg;
        alert(msg);
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
}