var prev = document.getElementById("prevorder");
var next = document.getElementById("nextorder");
var cont = document.getElementById("content-sell");
var image = document.createElement("div");
image.setAttribute("class","image-content");
var img = document.createElement("img");
img.setAttribute("alt","image of trade");
img.setAttribute("class","img-fluid");
image.appendChild(img);
var info = document.createElement("div");
info.setAttribute("class","info-content");
var imagedesc = document.createElement("div");
imagedesc.setAttribute("class","image-description");
var imagecomments = document.createElement("div");
imagecomments.setAttribute("class","image-comments");
var commentadd = document.createElement("div");
commentadd.setAttribute("class","comment-add");
var form = document.createElement("form");
form.setAttribute("method","post");
form.setAttribute("class","form-add-comment");
var label = document.createElement("label");
label.innerHTML = "Comment";
var textarea = document.createElement("textarea");
textarea.setAttribute("id","comment-text-content");
textarea.setAttribute("placeholder","Add your comment here...");
textarea.setAttribute("style","resize:none;width:100%;");
textarea.setAttribute("id","comment-text-content");
var diverror = document.createElement("div");
diverror.setAttribute("id","errorcomment");
diverror.setAttribute("class","errormess");
var button = document.createElement("button");
button.setAttribute("type","button");
button.setAttribute("id","comment-add-submit");
button.setAttribute("style","float:right;margin:2%;");
button.setAttribute("class","btn btn-primary");
button.innerHTML = "Add comment";
form.appendChild(label);
form.appendChild(textarea);
form.appendChild(diverror);
form.appendChild(button);
commentadd.appendChild(form);
var allcomments = document.createElement("div");
allcomments.setAttribute("id","all-comments");
imagecomments.appendChild(allcomments);
imagecomments.appendChild(commentadd);
info.appendChild(imagedesc);
info.appendChild(imagecomments);
var similar = document.createElement("div");
similar.setAttribute("class","similar datasellers");
var username;
var userid;
var aorderid;
var aportfolioid = 33;
var imgsrc = [];
var imgdesc = [];
var n = 0;
getUser();
setcontentdatacenter(n);
function setcontentdatacenter(){
  //  getorderdescandimg();
    console.log(imgsrc);
    console.log(imgdesc);
    cont.innerHTML = "";
    img.setAttribute("src",imgsrc[n]);
    cont.appendChild(image);
    imagedesc.innerHTML = imgdesc[n];
    cont.appendChild(info);
    cont.appendChild(similar);
}
prev.addEventListener("click",function(){
    console.log(n);
    if(n == 0){
        n = imgdesc.length - 1;
    }else{
        n--;
    }
    setcontentdatacenter();
});
next.addEventListener("click",function(){
     console.log(n);
    if(n == imgdesc.length - 1){
        n = 0;
    }else{
        n++;
    }
setcontentdatacenter();
});

button.addEventListener("click",function(){
    diverror.innerHTML = "";
    textarea.style.border = "0px solid red";
    if(textarea.value == ""){    
        textarea.style.border = "1px solid red";
        diverror.innerHTML = "* This field is required";
    }else{
        $.ajax({
            "async": true,
            "crossDomain": true,
            url: "http://10.3.50.6/api/comment",
            type: "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            dataType: 'json',
            success: function(data){
                },
            error: function(xhr, ajaxOptions, thrownError){
                textarea.style.border = "1px solid red";
                diverror.innerHTML ="Error: " + xhr.responseText;
            }
        });
    }
});
function deletecomments(){
    
}
function updatecomments(){
    
}
getComments();
function getComments(){
            allcomments.innerHTML = "";
            $.ajax({
            "async": true,
            "crossDomain": true,
            url: "http://10.3.50.6/api/comment",
            type: "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            dataType: 'json',
            success: function(data){
                if(data.length != 0){
                    for(var i = 0;i < data.length ; i++){
                        setComments(i,data);
                    }
                }else{
                    allcomments.innerHTML = "No comments found";
                }
                },
            error: function(xhr, ajaxOptions, thrownError){
                
            }
        });
}

function setComments(i,data){
        var divcomment = document.createElement("div");
        divcomment.setAttribute("class","image-comment");
        var divhead = document.createElement("div");
        divhead.setAttribute("class","comment-head");
        var divcontent = document.createElement("div");
        divcontent.setAttribute("class","comment-content");
        divcontent.style.background = "#F8F9FA";
        divcontent.style.border = "10px solid #e0e0eb";
        var j = document.createElement("i");
        j.setAttribute("class","fa fa-user");
        divhead.appendChild(j);
        divhead.innerHTML += "  " +  data[i].userId + " <span style='color:#0889C4;font-size:15px;'> on "+data[i].postedOn+"</span>";
        divcontent.innerHTML = data[i].message;
        divcomment.appendChild(divhead);
        divcomment.appendChild(divcontent);
        allcomments.appendChild(divcomment);
}

function getorderdescandimg(){
        imgsrc = [];
        imgdesc = [];
           $.ajax({
    	"async": true,
  		"crossDomain": true,
  		url: "http://10.3.50.6/api/order/get?portfolioId="+aportfolioid,
        type: "GET",
        "headers": {
    		"Content-Type": "application/json",
            "Authorization": "Bearer " + token
  		},
        dataType: 'json',
        success: function(data){
                    for(var i = 0;i < data.length; i++){
                        imgsrc[i] = JSON.stringify(data[i].imgURL);
                        imgdesc[i] =  JSON.stringify(data[i].description);
                    }
            },
        error: function(xhr, ajaxOptions, thrownError){
        	console.log(xhr.status);
        	console.log(thrownError);
            console.log(xhr);
        }
    });
}
function getUser(){
                $.ajax({
            "async": true,
            "crossDomain": true,
            url: "http://10.3.50.6/api/user",
            type: "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            dataType: 'json',
            success: function(data){
                username= data.userName;
                userid= data.userId;
                },
            error: function(xhr, ajaxOptions, thrownError){
                
            }
        });
}