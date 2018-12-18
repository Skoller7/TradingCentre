/*
token from current logged in user
*/
var token = getCookie("jwtToken");
/*
elements for changing content
*/
var cards = document.getElementById("cards");
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
var n_own = 0;
var max_own = 6;
var n_other = 0;
var max_other = 6;
getcard();
getcardhigh();
/*
get for sale portfolios from current user
*/
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
            }
        }
    }
    });
}
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
                    }else{
                        document.getElementById("titleother").style.display = "block";
                        setcontentcards(arrayforsale,"see-more-other",false,max_other,n_other);
                    }
                }
            } 
    });
}
/*
see more button, set content on screen
*/
function setcontentcards(arrayport,seemoreid,boolown,max,n){
    var seemore = document.getElementById(seemoreid);
    var lengtharray = arrayport.length / 6;
    lengtharray = lengtharray.toFixed(0);
    if(lengtharray == 1 || lengtharray == 0){
        max = arrayport.length;
    }
    for(var i = n; i < max;i++){
            if(arrayport[i].address != null && arrayport[i].address != ""){
                    setcard(arrayport,i,boolown);
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
                setcontentcards(arrayport,seemoreid,boolown,max,n);
            });
            seemore.style.display = "block";
            seemore.appendChild(a);
    }
}
/*
display card on screen 
*/
function setcard(data,i,own){
               var card = document.createElement("div");
                card.setAttribute("class","col-md-3 col-sm-12 card");
                var img = document.createElement("img");
                img.setAttribute("alt","image of trade");
                img.setAttribute("class","img-fluid");
                img.setAttribute("height","50%");
                img.setAttribute("src",data[i].imgURL);
                card.appendChild(img);
                var cardbody = document.createElement("div");
                cardbody.setAttribute("class","card-body");
                if(own){
                    cardbody.innerHTML +=  "<h5 class='card-title'>"+data[i].name+"</h5>";
                }else{
                    cardbody.innerHTML +=  "<h5 class='card-title'>skoller</h5>";
                }
                cardbody.innerHTML +=  "<p class='card-text' id='portfoliodesc'>"+data[i].description+"</p>";
                cardbody.innerHTML += "<a href='datacenternew.php?portfolioId="+data[i].portfolioId+"' class='btn btn-primary'>Show Preview</a>";
                card.appendChild(cardbody);
                if(own){
                    cards.appendChild(card);
                }else{
                    high.appendChild(card);
                }
}