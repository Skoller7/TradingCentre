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
var currentusername;
var currentuserid;
/*
arrays with order info
*/
var imgsrc = [];
var imgdesc = [];
var orderid = [];
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
check if portfolio is for sale
*/
function checkportissell(){
    makerequestnopar("http://10.3.50.6/api/portfolio?soldOnly=true&portfolioId="+aportfolioid,"GET",token,function(data){
            if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                    cont.innerHTML = "<p style='font-size:30px;margin-left:-12%;'>Error 404: page not found</p><a style='font-size:30px;margin-left:-12%;' href='datacenteroverview.php'>Go back to datacenteroverview</a>";
                }else if(data.address == null || data.address == ""){
                    cont.innerHTML = "<a style='font-size:30px;margin-left:-12%;' href='createdataselling.php?portfolioId="+aportfolioid+"'>Sell your portfolio here</a>";
                }else{
                    imgsrc = [];
                    imgdesc = [];
                    orderid = [];
                    makerequestnopar("http://10.3.50.6/api/purchase","GET",token,function(purchase){
                            if(purchase.length != 0){
                            for(var i = 0;i < purchase.length;i++){
                                if(aportfolioid == purchase[i].portfolioId){
                                    purchased = true;
                                }
                            }
                            }else{
                                purchased = false;
                            }
                                makerequestnopar("http://10.3.50.6/api/order/getfromsold?portfolioId="+aportfolioid,"GET",token,function(order){
                                    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
                                         cont.innerHTML = "<p style='font-size:30px;margin-left:-12%;'>Error 404: page not found</p><a style='font-size:30px;margin-left:-12%;' href='datacenteroverview.php'>Go back to datacenteroverview</a>";
                                    }else if(getstatus() == 404){
                                        cont.innerHTML = "<p style='font-size:30px;margin-left:-12%;'>Error 404: no orders found</p><a style='font-size:30px;margin-left:-12%;' href='datacenteroverview.php'>Go back to datacenteroverview</a>";
                                    }else{
                                        var booluser = false;
                                        makerequestnopar("http://10.3.50.6/api/user","GET",token,function(user){
                                                if(data.userId == user.userId){
                                                    booluser = true;
                                                }
                                            },false);
                                    if(purchased || booluser){
                                            for(var i = 0;i < order.length; i++){     
                                                imgsrc[i] = order[i].imgURL;
                                                imgdesc[i] =  order[i].description;
                                                orderid[i] = order[i].orderId;
                                            }
                                    }else{
                                            for(var i = 0;i < order.length; i++){     
                                                imgsrc[i] = order[i].imgURL;
                                                imgdesc[i] =  order[i].description;
                                                orderid[i] = order[i].orderId;
                                            }
                                    }
                                        if(imgdesc.length > 1){
                                            setbtn();
                                        }
                                        getUser(data.userId);
                                        setcontentdatacenter();
                                    }
                                },true);
                },true);
            }
    },true);
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
            checkFooterPosition();
        });
        btn2.addEventListener("click",function(){
            if(n == imgdesc.length - 1){
                n = 0;
            }else{
                n++;
            }
            setcontentdatacenter();
            checkFooterPosition();
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
    if(purchased){
        getComments();
    }
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
        makerequest(json,"http://10.3.50.6/api/ordercomment","PUT",token,function(data){
            if(getstatus() != 200){
                textarea.style.border = "1px solid red";
                 diverror.innerHTML ="Error: " + xhr.responseText;
            }else{
                getComments();
                textarea.style.border = "0px solid red";
                diverror.innerHTML = "";
                textarea.value = "";
            }
        });
        }else{
            var json = {"PortfolioId": aportfolioid,"Message": textarea.value};
            makerequest(json,"http://10.3.50.6/api/portfoliocomment","PUT",token,function(data){
                            if(getstatus() == 200){
                                getComments();
                                textarea.style.border = "0px solid red";
                                diverror.innerHTML = "";
                                textarea.value = "";
                            }
            });
        }
    }
});
/*
delete comment from portfolio if purchased from the order
*/
function deletecomments(e){
    if(purchased){
        openyesno(function(){
            makerequestnopar("http://10.3.50.6/api/ordercomment?commentId="+e.target.id,"DELETE",token,function(data){
                    if(getstatus() == 200){
                        getComments();
                    }
           },true);
       });
    }else{
        openyesno(function(){
            makerequestnopar("http://10.3.50.6/api/portfoliocomment?commentId="+e.target.id,"DELETE",token,function(data){
                    if(getstatus() == 200){
                        getComments();
                    }
            },true);
        });
    }
}
/*
update comment from portfolio if purchased from the order
*/
function updatecomments(e){
    var comment = document.getElementById("comment"+e.target.id);
    var commenttext = comment.innerHTML;
    var textcontent = "<textarea id='comment-text-update' style='resize:none;width:100%;'>"+commenttext+"</textarea>";
    comment.innerHTML = "";
    comment.innerHTML = textcontent;
    var btn = document.createElement("button");
    btn.setAttribute("type","button");
    btn.setAttribute("id",e.target.id);
    btn.setAttribute("style","float:right;");
    btn.setAttribute("class","btn btn-primary");
    btn.innerHTML = "update comment";
    var cancel = document.createElement("a");
    cancel.setAttribute("class","btn btn-light");
    cancel.setAttribute("style","float:right;");
    cancel.innerHTML = " cancel ";
    cancel.addEventListener("click",function(){
        comment.innerHTML = commenttext;
    });
    comment.style.margin = "1%";
    comment.appendChild(btn);
    comment.appendChild(cancel);
    btn.addEventListener("click",function(e){
        var text = document.getElementById("comment-text-update");
        if(text.value == ""){    
            text.style.border = "1px solid red";
            text.setAttribute("placeholder","This field is required");
        }else{
            if(purchased){
                var json = {"CommentId": e.target.id,"Message": text.value};
                makerequest(json,"http://10.3.50.6/api/ordercomment","POST",token,function(data){
                    if(getstatus() == 200){
                            getComments();
                        }
                });
            }else{
                 var json = {"CommentId": e.target.id,"Message": text.value};
                makerequest(json,"http://10.3.50.6/api/portfoliocomment","POST",token,function(data){
                              if(getstatus() == 200){
                                getComments();
                            }  
                });
            }
        }
    });
}
/*
get comments from portfolio if portfolio is not purchased else commments form order
*/
function getComments(){
            allcomments.innerHTML = "";
            if(purchased){
                makerequestnopar("http://10.3.50.6/api/order/comment?orderId="+orderid[n],"GET",token,function(data){
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
                            checkFooterPosition();

                },true);
            }else{
                makerequestnopar("http://10.3.50.6/api/portfolio/comment?portfolioId="+aportfolioid,"GET",token,function(data){
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
                            checkFooterPosition();

                },true);
            }
}
/*
display comments on screen
*/
function setComments(i,data){
        var cardcomment = document.createElement("div");
        cardcomment.className = "card";
        var comment = document.createElement("div");
        comment.setAttribute("style","padding:0;");
        comment.className = "card-body";
        var image = document.createElement("div");
        image.setAttribute("class","image-comment");
        image.setAttribute("style","width:8%;float:left;margin:1%;");
        image.innerHTML = "<img src="+pictureURL+" style='width:100%;'>";
        var divcomment = document.createElement("div");
        divcomment.setAttribute("style","width:90%;float:left;");
        divcomment.setAttribute("id","divcomment"+data[i].commentId);
        var divhead = document.createElement("div");
        divhead.setAttribute("class","comment-head");
        var divcontent = document.createElement("div");
        divcontent.setAttribute("class","comment-content");
        divcontent.setAttribute("id","comment"+data[i].commentId);
        divhead.innerHTML +=  "<span id='username"+data[i].commentId+"'></span><span style='color:#0889C4;font-size:15px;'> on "+data[i].postedOn+"</span> ";
        divcontent.innerHTML = data[i].message;
        divcomment.appendChild(divhead);
        divcomment.appendChild(divcontent);
        comment.appendChild(image);
        comment.appendChild(divcomment);
        cardcomment.appendChild(comment);
        allcomments.appendChild(cardcomment);
        getcurrentuser(function(){
            if(data[i].userId == currentuserid){
                getuserid(data[i].userId,data[i].commentId);
                document.getElementById("username"+data[i].commentId).innerHTML = currentusername;
                cardcomment.setAttribute("style","width:100%;float:left;margin:1%;margin-left:0%;border:1px solid #0889C4");
            }else{
                getusername(data[i].userId,"username"+data[i].commentId);
                cardcomment.setAttribute("style","width:100%;float:left;margin:1%;margin-left:0%;border:1px solid #25313B");
            }
        });
}
/*
get userid from current logged in user
*/
function getuserid(userid,commentid){
        makerequestnopar("http://10.3.50.6/api/user","GET",token,function(data){
            if(getstatus() == 200 ){
                if(userid = data.userId){
                        var divfooter = document.createElement("div");
                        var editcom = document.createElement("a");
                        editcom.setAttribute("href","#");
                        editcom.setAttribute("id",commentid);
                        editcom.addEventListener("click",updatecomments);
                        editcom.innerHTML = " update ";
                        var del = document.createElement("a");
                        del.setAttribute("href","#");
                        del.setAttribute("id",commentid);
                        del.addEventListener("click",deletecomments);
                        del.innerHTML = " delete ";
                        divfooter.setAttribute("style","float:right;font-size:11px;width:100%;text-align:right;margin:1%;");
                        divfooter.appendChild(editcom);
                        divfooter.appendChild(del);
                        document.getElementById("divcomment"+commentid).appendChild(divfooter);
                }
            }
        },true);
}
/*
get current user
*/
function getcurrentuser(succes){
    makerequestnopar("http://10.3.50.6/api/user","GET",token,function(data){
        currentuserid = data.userId;
        currentusername = data.username;
        succes();
    },true);
}
/*
get username comment
*/
function getusername(userid,id){
    makerequestnopar("http://10.3.50.6/api/user?userId="+userid,"GET",token,function(data){
        document.getElementById(id).innerHTML = data.username;
    },true);
}
/*
get user information on user id
*/
function getUser(userid){
    makerequestnopar("http://10.3.50.6/api/user?userId="+userid,"GET",token,function(data){
    if(getstatus() == 400 || getstatus() == 401 || getstatus()== 501 || getstatus() == 500){
        return false;
    }else{
        pictureURL = data.pictureURL;
        description = data.description;
        username= data.username;
        userid= data.userId;
        setsidebar();
    }
    },true);
}