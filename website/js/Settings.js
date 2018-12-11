document.getElementById("general").addEventListener("click", showGeneral);

function showGeneral() {
    document.getElementById("general").className = "active";
    document.getElementById("security").className = "";
    document.getElementById("privacy").className = "";
    document.getElementById("account").className = "";
    
    doucment.getElementById("general-option").style.visibility = "visible";
    doucment.getElementById("security-option").style.visibility = "hidden";
    doucment.getElementById("privacy-option").style.visibility = "hidden";
    doucment.getElementById("account-option").style.visibility = "hidden";
}

function showSecurity() {
    document.getElementById("general").className = "";
    document.getElementById("security").className = "active";
    document.getElementById("privacy").className = "";
    document.getElementById("account").className = "";
    
    doucment.getElementById("general-option").style.visibility = "hidden";
    doucment.getElementById("security-option").style.visibility = "visible";
    doucment.getElementById("privacy-option").style.visibility = "hidden";
    doucment.getElementById("account-option").style.visibility = "hidden";
}

function showPrivacy() {
    document.getElementById("general").className = "";
    document.getElementById("security").className = "";
    document.getElementById("privacy").className = "activity";
    document.getElementById("account").className = "";
    
    doucment.getElementById("general-option").style.visibility = "hidden";
    doucment.getElementById("security-option").style.visibility = "hidden";
    doucment.getElementById("privacy-option").style.visibility = "visible";
    doucment.getElementById("account-option").style.visibility = "hidden";
}

function showAccount() {
    document.getElementById("general").className = "";
    document.getElementById("security").className = "";
    document.getElementById("privacy").className = "";
    document.getElementById("account").className = "active";
    
    doucment.getElementById("general-option").style.visibility = "hidden";
    doucment.getElementById("security-option").style.visibility = "hidden";
    doucment.getElementById("privacy-option").style.visibility = "hidden";
    doucment.getElementById("account-option").style.visibility = "visible";
}