var token = getCookie("jwtToken");
var cards = document.getElementById("cards");
var high = document.getElementById("highlightcards");
getcard();
getcardhigh();
function getcard(){
    var data = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true","GET",token);
    if(getstatus() == 400 || getstatus() == 401 || getstatus() == 500 || getstatus() == 501){
        alert("Something went wrong, please try again later");
    }else{
        for(var i=0;i < data.length;i++){
            setcard(data,i,true); 
        }
    }
}
function getcardhigh(){
    var data = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true&userId=31","GET",token);
    if(getstatus() == 400 || getstatus() == 401 || getstatus() == 500 || getstatus() == 501){
        alert("Something went wrong, please try again later");
    }else{
        console.log(data);
        for(var i=0;i < data.length;i++){
            setcard(data,i,false); 
        }
    }
}
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

//request portfolio Description

// function getPortfolioDesc(){
//   var data = makerequestnopar("http://10.3.50.6/api/portfolio/comment?portfolioId=15","GET",token);
//   var description = document.getElementById("sell-port-all");
//   description.innerHTML = "";
//   for(var i = 0; i < data.length;i++){
//     var li = document.createElement("div");
//     li.setAttribute("class", "card-body");
//     var content = document.createElement("h5");
//     content.setAttribute("class", "card-title");
//   }
// }


//request to get the portfolios
// function getportfolios(){
//         var data = makerequestnopar("http://10.3.50.6/api/note?portfolioId=" + activeportfolioid,"GET",token);
//         var notes = document.getElementById("notes-all");
//         notes.innerHTML = "";
//       for(var i = 0; i < data.length;i++){
//         var li = document.createElement("div");
//         li.setAttribute("class","notes-card");
//         li.setAttribute("id",data[i].noteId + "note")
//         var content = document.createElement("div");
//         content.setAttribute("class","notes-content");
//         content.setAttribute("id","notes-content");
//         var content_del = document.createElement("i");
//         var content_edit = document.createElement("i");
//         var p = document.createElement("p");
//           p.innerHTML = data[i].message;
//         content.appendChild(p);
//         content.appendChild(content_edit);
//         content.appendChild(content_del);
//         content_del.setAttribute("id",data[i].noteId);
//         content_del.setAttribute("class","fa fa-trash");
//         content_edit.setAttribute("id",data[i].noteId);
//         content_edit.setAttribute("class","fa fa-edit");
//         notes.appendChild(li);
//         li.appendChild(content);
//       }
// }
//
// document.getElementById("notes-all").addEventListener("click",function(e) {
// if(e.target && e.target.nodeName == "I" && !(isNaN(e.target.id))) {
//     if(e.target.className == "fa fa-trash"){
//                 makerequestnopar("http://10.3.50.6/api/note?noteId=" + e.target.id,"DELETE",token);
//                 document.getElementById(e.target.id + "note").style.display = "none";
//       }else{
//           var json = {"NoteId": e.target.id,"Message": "Hello world2d"};
//             $.ajax({
//                 "async": true,
//                 "crossDomain": true,
//                 url: "http://10.3.50.6/api/note",
//                 type: "POST",
//                 "headers": {
//                     "Content-Type": "application/json",
//                     "Authorization": "Bearer " + token
//                 },
//                 data:JSON.stringify(json),
//                 dataType: 'json',
//                 success:function(data){},
//                 error: function(xhr, ajaxOptions, thrownError){
//                     console.log(e.target.id);
//                     console.log(xhr.status);
//                     console.log(thrownError);
//                     console.log(xhr);
//                 }
//             });
//       }
// }
// });
