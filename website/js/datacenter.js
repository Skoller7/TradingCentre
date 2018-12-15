var btnprev = document.getElementById("btnprev");
var btnnext = document.getElementById("btnnext");
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
var pictureURL;
var description;
var imgsrc = [];
var imgdesc = [];
var orderid = [];
var n = 0;
var sideusername = document.getElementById("username-port");
var sideimg = document.getElementById("img-user");
var sidedesc = document.getElementById("user-description");
var urlParams = new URLSearchParams(window.location.search);
var aportfolioid = urlParams.get('portfolioId');
checkportissell();
function checkportissell(){
    var data = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true&portfolioId="+aportfolioid,"GET",token);
    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
        cont.innerHTML = "<p style='font-size:30px;margin-left:-12%;'>Error 404: page not found</p><a style='font-size:30px;margin-left:-12%;' href='datacenteroverview.php'>Go back to datacenteroverview</a>";
    }else if(data.address == null || data.address == ""){
        cont.innerHTML = "<a style='font-size:30px;margin-left:-12%;' href='createdataselling.php?portfolioId="+aportfolioid+"'>Sell your portfolio here</a>";
    }else{
        if(getorderdescandimg() == true){
            console.log(imgsrc);
            setcontentdatacenter();
        }else{
        cont.innerHTML = "<p style='font-size:30px;margin-left:-12%;'>Error 404: page not found</p><a style='font-size:30px;margin-left:-12%;' href='datacenteroverview.php'>Go back to datacenteroverview</a>";
        }
    }
                setsidebar();
}
function setsidebar(){
    if(getUser()){
        sideusername.innerHTML = username;
        sideimg.setAttribute("src",pictureURL);
        sidedesc.innerHTML += description;
    }
}
function setcontentdatacenter(){
    cont.innerHTML = "";
    img.setAttribute("src",imgsrc[n]);
    cont.appendChild(image);
    imagedesc.innerHTML = imgdesc[n];
    cont.appendChild(info);
    getComments();
    cont.appendChild(similar);
    if(imgdesc.length == 0){
        var btn = document.createElement("button");
        var btn2 = document.createElement("button");
        btn.setAttribute("type","button");
        btn.setAttribute("style","float:right;top:40%;position: absolute;");
        btn.setAttribute("class","btn btn-primary");
        btn.innerHTML = "<i class='fa fa-angle-left'></i>";
        btnprev.appendChild(btn);
        btn2.setAttribute("type","button");
        btn2.setAttribute("style","float:right;top:40%;position: absolute;");
        btn2.setAttribute("class","btn btn-primary");
        btn2.innerHTML = "<i class='fa fa-angle-right'></i>";
        btnnext.appendChild(btn);
        btn.addEventListener("click",function(){
            if(n == 0){
                n = imgdesc.length - 1;
            }else{
                n--;
            }
            setcontentdatacenter();
        });
        btn2.addEventListener("click",function(){
             console.log(n);
            if(n == imgdesc.length - 1){
                n = 0;
            }else{
                n++;
            }
            setcontentdatacenter();
        });
    }
}

button.addEventListener("click",function(){
    diverror.innerHTML = "";
    textarea.style.border = "0px solid red";
    if(textarea.value == ""){    
        textarea.style.border = "1px solid red";
        diverror.innerHTML = "* This field is required";
    }else{
        var json = {"OrderId": orderid[n],"Message": textarea.value}
        $.ajax({
            "async": true,
            "crossDomain": true,
            url: "http://10.3.50.6/api/ordercomment",
            type: "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            data:JSON.stringify(json),
            dataType: 'json',
            success: function(data){
                },
            error: function(xhr, ajaxOptions, thrownError){
                textarea.style.border = "1px solid red";
                if(xhr.status != 200){
                diverror.innerHTML ="Error: " + xhr.responseText;
                }else{
                    textarea.style.border = "0px solid red";
                    diverror.innerHTML = "";
                    getComments();
                }
            }
        });
    }
});
function deletecomments(){
    
}
function updatecomments(){
    
}
function getComments(){
            allcomments.innerHTML = "";
            var data = makerequestnopar("http://10.3.50.6/api/order/comment?orderId="+orderid[n],"GET",token);
            if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                allcomments.innerHTML = "No comments found";
            }else{
                if(data.length != 0){
                    for(var i = 0;i < data.length ; i++){
                        setComments(i,data);
                    }
                }else{
                    allcomments.innerHTML = "No comments found";
                }
            }
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
        divhead.innerHTML += "  " + username + " <span style='color:#0889C4;font-size:15px;'> on "+data[i].postedOn+"</span>";
        divcontent.innerHTML = data[i].message;
        divcomment.appendChild(divhead);
        divcomment.appendChild(divcontent);
        allcomments.appendChild(divcomment);
}

function getorderdescandimg(){
        imgsrc = [];
        imgdesc = [];
        orderid = [];
        var data = makerequestnopar("http://10.3.50.6/api/order/get?portfolioId="+aportfolioid,"GET",token);
    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
        return false;
    }else{
        for(var i = 0;i < data.length; i++){
            
            imgsrc[i] = data[i].imgURL;
            imgdesc[i] =  data[i].description;
            orderid[i] = data[i].orderId;
        }
        return true;
    }
}
function getUser(){
    var data = makerequestnopar("http://10.3.50.6/api/user","GET",token);
    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
        return false;
    }else{
        pictureURL = data.pictureURL;
        description = data.description;
        username= data.username;
        userid= data.userId;
        return true;
    }
}