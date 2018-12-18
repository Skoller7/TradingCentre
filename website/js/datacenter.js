/*
elements for display content 
*/
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
var sideusername = document.getElementById("username-port");
var sideimg = document.getElementById("img-user");
var sidedesc = document.getElementById("user-description");
/*
user information variables
*/
var username;
var userid;
var pictureURL;
var description;
/*
arrays with order info
*/
var imgsrc = [];
var imgdesc = [];
var orderid = [];
/*
array with all purchased portfolios from current user
*/
var purchases = [];
/*
bool if current portfolio is purchased
*/
var purchased = false;
/*
position in arrays
*/
var n = 0;
/*
get parameter from url
*/
var urlParams = new URLSearchParams(window.location.search);
var aportfolioid = urlParams.get('portfolioId');
/*
delete yes or no
*/
function openyesno(functiondelete){
	closeAllModals();
	$('#yesorno').modal({
		backdrop: 'static'
	});
document.getElementById("yess").addEventListener("click",function (e){
	$('#yesorno').modal('toggle');
    functiondelete();
});
document.getElementById("noo").addEventListener("click",function (e){
	$('#yesorno').modal('toggle');
});
}
checkportissell();
/*
check if portfolio is purchased
*/
function checkportispur(){
    getpurchases();
    for(var i = 0;i < purchases.length;i++){
        if(aportfolioid == purchases[i].portfolioId){
            purchased = true;
            return;
        }
    }
}
/*
check if portfolio is for sale
*/
function checkportissell(){
    var data = makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true&portfolioId="+aportfolioid,"GET",token);
    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
        cont.innerHTML = "<p style='font-size:30px;margin-left:-12%;'>Error 404: page not found</p><a style='font-size:30px;margin-left:-12%;' href='datacenteroverview.php'>Go back to datacenteroverview</a>";
    }else if(data.address == null || data.address == ""){
        cont.innerHTML = "<a style='font-size:30px;margin-left:-12%;' href='createdataselling.php?portfolioId="+aportfolioid+"'>Sell your portfolio here</a>";
    }else{
        if(getorderdescandimg() == true){
            checkportispur();
            if(purchased){
                if(imgdesc.length > 1){
                    setbtn();
                }
            }
            getUser(data.userId);
            setcontentdatacenter();
        }else{
        cont.innerHTML = "<p style='font-size:30px;margin-left:-12%;'>Error 404: page not found</p><a style='font-size:30px;margin-left:-12%;' href='datacenteroverview.php'>Go back to datacenteroverview</a>";
        }
    }
        setsidebar();
}
/*
set sidebar with user information
*/
function setsidebar(){
        sideusername.innerHTML = username;
        sideimg.setAttribute("src",pictureURL);
        sidedesc.innerHTML += description;
}
/*
set buttons left and right only if user purchased portfolio
*/
function setbtn(){
        var btn = document.createElement("button");
        var btn2 = document.createElement("button");
        btn.setAttribute("type","button");
        btn.setAttribute("style","float:right;top:300px;position: absolute;");
        btn.setAttribute("class","btn btn-primary");
        btn.innerHTML = "<i class='fa fa-angle-left'></i>";
        btnprev.appendChild(btn);
        btn2.setAttribute("type","button");
        btn2.setAttribute("style","float:right;top:300px;position: absolute;");
        btn2.setAttribute("class","btn btn-primary");
        btn2.innerHTML = "<i class='fa fa-angle-right'></i>";
        btnnext.appendChild(btn2);
        btn.addEventListener("click",function(){
            if(n == 0){
                n = imgdesc.length - 1;
            }else{
                n--;
            }
            setcontentdatacenter();
        });
        btn2.addEventListener("click",function(){
            if(n == imgdesc.length - 1){
                n = 0;
            }else{
                n++;
            }
            setcontentdatacenter();
        }); 
}
/*
set content datacenter with image, description and comments from one order
*/
function setcontentdatacenter(){
    cont.innerHTML = "";
    img.setAttribute("src",imgsrc[n]);
    cont.appendChild(image);
    imagedesc.innerHTML = imgdesc[n];
    cont.appendChild(info);
    getComments();
    cont.appendChild(similar);
}
/*
adds comment to portfolio if user not purchased the current portfolio otherwise comment will be added to order
*/
button.addEventListener("click",function(){
    diverror.innerHTML = "";
    textarea.style.border = "0px solid red";
    if(textarea.value == ""){    
        textarea.style.border = "1px solid red";
        diverror.innerHTML = "* This field is required";
    }else{
        if(purchased){
        var json = {"OrderId": orderid[n],"Message": textarea.value};
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
                getComments();
                },
            error: function(xhr, ajaxOptions, thrownError){
                textarea.style.border = "1px solid red";
                if(xhr.status != 200){
                    diverror.innerHTML ="Error: " + xhr.responseText;
                }else{
                    textarea.style.border = "0px solid red";
                    diverror.innerHTML = "";
                    textarea.value = "";
                    getComments();
                }
            }
        });
        }else{
            var json = {"PortfolioId": aportfolioid,"Message": textarea.value};
            makerequest(json,"http://10.3.50.6/api/portfoliocomment","PUT",token);
            if(getstatus() == 200){
                getComments();
            }
        }
    }
});
/*
delete comment from portfolio if purchased from the order
*/
function deletecomments(e){
    if(purchased){
        openyesno(function(){
            makerequestnopar("http://10.3.50.6/api/ordercomment?commentId="+e.target.id,"DELETE",token);
        });
    }else{
        openyesno(function(){
            makerequestnopar("http://10.3.50.6/api/portfoliocomment?commentId="+e.target.id,"DELETE",token);
        });
    }
    if(getstatus() == 200){
        getComments();
    }
}
/*
update comment from portfolio if purchased from the order
*/
function updatecomments(e){
    var comment = document.getElementById("comment"+e.target.id);
    var textcontent = "<textarea id='comment-text-update' style='resize:none;width:100%;'>"+comment.innerHTML+"</textarea>";
    comment.innerHTML = "";
    comment.innerHTML = textcontent;
    var btn = document.createElement("button");
    btn.setAttribute("type","button");
    btn.setAttribute("id",e.target.id);
    btn.setAttribute("style","float:right;margin:2%;");
    btn.setAttribute("class","btn btn-primary");
    btn.innerHTML = "update comment";
    comment.appendChild(btn);
    btn.addEventListener("click",function(e){
        var text = document.getElementById("comment-text-update");
        if(text.value == ""){    
            text.style.border = "1px solid red";
            text.setAttribute("placeholder","This field is required");
        }else{
            if(purchased){
                var json = {"CommentId": e.target.id,"Message": text.value};
                makerequest(json,"http://10.3.50.6/api/ordercomment","POST",token);
            }else{
                 var json = {"CommentId": e.target.id,"Message": text.value};
                makerequest(json,"http://10.3.50.6/api/portfoliocomment","POST",token);
            }
            if(getstatus() == 200){
                getComments();
            }
        }
    });
}
/*
get all purchases from current user
*/
function getpurchases(){
     var data = makerequestnopar("http://10.3.50.6/api/purchase","GET",token);
    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
        return false;
    }
    purchases = data;
    return true;
}
/*
get comments from portfolio if portfolio is not purchased else commments form order
*/
function getComments(){
            allcomments.innerHTML = "";
            var data;
            if(purchased){
                data = makerequestnopar("http://10.3.50.6/api/order/comment?orderId="+orderid[n],"GET",token);
            }else{
                data = makerequestnopar("http://10.3.50.6/api/portfolio/comment?portfolioId="+aportfolioid,"GET",token);
            }
            if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                allcomments.innerHTML = "No comments found";
            }else{
                if(data.length != 0){
                    for(var i = 0; i < data.length; i++){
                        setComments(i,data);
                    }
                }else{
                    allcomments.innerHTML = "No comments found";
                }
            }
}
/*
display comments on screen
*/
function setComments(i,data){
        var cardcomment = document.createElement("div");
        cardcomment.setAttribute("style","width:100%;float:left;margin:1%;margin-left:0%;");
        cardcomment.className = "card";
        var comment = document.createElement("div");
        comment.className = "card-body";
        var image = document.createElement("div");
        image.setAttribute("class","image-comment");
        image.setAttribute("style","width:8%;float:left;margin:1%;");
        image.innerHTML = "<img src="+pictureURL+" style='width:100%;'>";
        var divcomment = document.createElement("div");
        divcomment.setAttribute("style","width:90%;float:left;");
        var divhead = document.createElement("div");
        divhead.setAttribute("class","comment-head");
        var divcontent = document.createElement("div");
        divcontent.setAttribute("class","comment-content");
        divcontent.setAttribute("id","comment"+data[i].commentId);
        divhead.innerHTML +=  username + " <span style='color:#0889C4;font-size:15px;'> on "+data[i].postedOn+"</span> ";
        var divfooter = document.createElement("div");
        if(data[i].userId == getuserid()){
            var editcom = document.createElement("a");
            editcom.setAttribute("href","#");
            editcom.setAttribute("id",data[i].commentId);
            editcom.addEventListener("click",updatecomments);
            editcom.setAttribute("class",data[i].message);
            editcom.innerHTML = " update ";
            var del = document.createElement("a");
            del.setAttribute("href","#");
            del.setAttribute("id",data[i].commentId);
            del.addEventListener("click",deletecomments);
            del.setAttribute("class",data[i].message);
            del.innerHTML = " delete ";
            divfooter.setAttribute("style","float:right;font-size:11px;width:100%;text-align:right;");
            divfooter.appendChild(editcom);
            divfooter.appendChild(del);
        }
        divcontent.innerHTML = data[i].message;
        divcomment.appendChild(divhead);
        divcomment.appendChild(divcontent);
        divcomment.appendChild(divfooter);
        comment.appendChild(image);
        comment.appendChild(divcomment);
        cardcomment.appendChild(comment);
        allcomments.appendChild(cardcomment);
}
/*
get description, image and orderid from selling portfolio
*/
function getorderdescandimg(){
        imgsrc = [];
        imgdesc = [];
        orderid = [];
        var data = makerequestnopar("http://10.3.50.6/api/order/get?portfolioId="+aportfolioid,"GET",token);
    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
        return false;
    }else{
        if(data.length == 0){
            return false;
        }
        for(var i = 0;i < data.length; i++){     
            imgsrc[i] = data[i].imgURL;
            imgdesc[i] =  data[i].description;
            orderid[i] = data[i].orderId;
        }
        return true;
    }
}
/*
get userid from current logged in user
*/
function getuserid(){
        var data = makerequestnopar("http://10.3.50.6/api/user","GET",token);
        if(getstatus() == 200 ){
            return data.userId;
        }
        return false;
}
/*
get user information on user id
*/
function getUser(userid){
    var data = makerequestnopar("http://10.3.50.6/api/user?userId="+userid,"GET",token);
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