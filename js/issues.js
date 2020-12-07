window.onload = function(){
    var newIssueBtn = document.querySelector('#new-issue-btn');
    var byAllFilterBtn = document.querySelector('#byall');
    var byOpenFilterBtn = document.querySelector('#byopen');
    var byTicketsFilterBtn = document.querySelector('#bytickets');
    var xhr;

    //links to full descriptions

    //update styles for statuses

    newIssueBtn.onclick = function(element){
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

}