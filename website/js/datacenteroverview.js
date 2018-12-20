/*
token from current logged in user
*/
var token = getCookie("jwtToken");
/*
elements for changing content
*/
//var cards = document.getElementById("cards");
var high = document.getElementById("highlightcards");
var seemoreother = document.getElementById("see-more-other");
/*
array with all for sale portfolios from other users
*/
var arrayforsale;
/*
array with all for sale portfolios from current user
*/
var arrayforsaleown;
/*
begin and max for arrays to show, the function setcontentcards will change the value if see more is clicked
*/
var n_other = 0;
var max_other = 2;
//getcard();
getcardhigh();
/*
get for sale portfolios from current user
function getcard(){
    makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true","GET",token,function(data){
    if(getstatus() == 401){
        openMLogin();
    }else{
        if(getstatus() == 400 || getstatus() == 500 || getstatus() == 501){
            alert("Something went wrong, please try again later");
        }else{
            arrayforsaleown = data;
            if(arrayforsaleown.length == 0){
                document.getElementById("titleown").style.display = "none";
            }else{
                document.getElementById("titleown").style.display = "block";
                setcontentcards(arrayforsaleown,"see-more-own",true,max_own,n_own);
                setcontentcards(arrayforsale,"see-more-other",false,max_other,n_other);
            }
        }
    }
    });
}
*/
/*
get for sale portfolios from other users
*/
function getcardhigh(){
    makerequestnopar("http://10.3.50.6/api/portfolio/forsale","GET",token,function(data){
           if(getstatus() == 401){
                openMLogin();
            }else{
                if(getstatus() == 400 || getstatus() == 500 || getstatus() == 501){
                    alert("Something went wrong, please try again later");
                }else{
                    arrayforsale = data;
                    if(arrayforsale.length == 0){
                        document.getElementById("titleother").style.display = "none";
                        seemoreother.style.display = "none";
                        high.innerHTML = "No selling portfolios found";
                    }else{
                        document.getElementById("titleother").style.display = "block";
                        seemoreother.style.display = "block";
                        setcontentcards(arrayforsale,"see-more-other",max_other,n_other);
                    }
                }
            } 
    });
        checkFooterPosition();

}
/*
see more button, set content on screen
*/
function setcontentcards(arrayport,seemoreid,max,n){
    var seemore = document.getElementById(seemoreid);
    var lengtharray = arrayport.length / 6;
    lengtharray = lengtharray.toFixed(0);
    if(lengtharray == 1 || lengtharray == 0){
        max = arrayport.length;
    }
    for(var i = n; i < max;i++){
            if(arrayport[i].address != null && arrayport[i].address != ""){
                    setcard(arrayport,i);
            }
    }
    lengtharray--;
    seemore.style.display = "none";
    seemore.innerHTML = "";
    if(lengtharray > 0){
            var a = document.createElement("a");
            a.setAttribute("href","#");
            a.setAttribute("style","margin:0 auto;");
            a.innerHTML = "See more";
            a.addEventListener("click",function(){
                n = max;
                if(lengtharray > 1){
                    max = max + 6;
                }else{
                    max = arrayport.length;
                }
                setcontentcards(arrayport,seemoreid,max,n);
            });
            seemore.style.display = "block";
            seemore.appendChild(a);
    }
}
/*
display card on screen 
*/
function setcard(data,i){
               var card = document.createElement("div");
                card.setAttribute("class","col-md-3 col-sm-12 card");
                var img = document.createElement("img");
                img.setAttribute("alt","image of trade");
                img.setAttribute("class","img-fluid");
                img.setAttribute("src",data[i].imgURL);
                var cardbody = document.createElement("div");
                cardbody.setAttribute("class","card-body");
                card.appendChild(img);
                cardbody.innerHTML +=  "<h5 class='card-title' id='usernamecard"+data[i].portfolioId+"'></h5>";
                cardbody.innerHTML +=  "<p class='card-text' id='portfoliodesc'>"+data[i].description+"</p>";
                cardbody.innerHTML += "<a href='datacenternew.php?portfolioId="+data[i].portfolioId+"' class='btn btn-primary'>Show Preview</a>";
                card.appendChild(cardbody);
                high.appendChild(card);
                getusername(data[i].userId,"usernamecard"+data[i].portfolioId);
}
/*
get username selling portfolio
*/
function getusername(userid,id){
    makerequestnopar("http://10.3.50.6/api/user?userId="+userid,"GET",token,function(data){
      document.getElementById(id).innerHTML = data.username;
    },true);
}