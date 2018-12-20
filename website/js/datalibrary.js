
   // var urlParams = new URLSearchParams(window.location.search);
   // var aportfolioid = urlParams.get('portfolioId');
   var token = getCookie("jwtToken");
   var data2; //received api data will be in this variable.  = makerequestnopar("http://10.3.50.6/api/purchase", "GET", token);
   var data = [];
   var cards = document.getElementById("cards");
   var seemoreother = document.getElementById("see-more-other");
   $('.makemodal').hide(); // in case i still want to add a modal if the player didn't buy anything.
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
   var adressen = [];


App = {
  web3Provider: null,
  contracts: {},

  initWeb3: async function(){

    if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    App.web3Provider = window.web3.currentProvider;
  }
  // If no injected web3 instance is detected, fall back to Ganache
  //local blockchain for developing purposes.
  else {
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
  web3 = new Web3(App.web3Provider);
    return App.initContract1();
  },

initContract1: function(){
  $.getJSON('./Solidity/build/contracts/DataContractCreator.json').then(DataCreatorArtifact => {
    App.contracts.DataContractCreator = TruffleContract(DataCreatorArtifact);
    App.contracts.DataContractCreator.setProvider(App.web3Provider);
    return $.getJSON('./Solidity/build/contracts/DataContract.json')
  }).then(DataContractArtifact => {
    App.contracts.DataContract = TruffleContract(DataContractArtifact);
    App.contracts.DataContract.setProvider(App.web3Provider);
    console.log(App.contracts);
  //  App.isUserBacker();
    App.getcard();
  })
},
//
// isUserBacker: function(){
//
//   App.contracts.DataContract.at('0x15781269bc3516278309224ad450a88e1de01fad').then(function(instance){
//     DataContractInstance = instance;
//
//       web3.eth.getAccounts(function(error, accounts) {
//         var account = accounts[0];
//     DataContractInstance.backers.call(account).then(function(r){
//       if(r == false){
//           $('.btn-buycheck').show();
//           $('#buyCheck').show();
//         console.log('Person is a backer');
//       }
//       else {
//           $('.btn-fault').show();
//       }
//     }).catch(function(err){
//       console.log(err);
//     });
//   });
// })
// },

getcard: function(){console.warn();
    makerequestnopar("http://10.3.50.6/api/purchase", "GET", token, function(data2){

    console.log(data2);
    for(var j = 0; j < data2.length; j++){

    makerequestnopar("http://10.3.50.6/api/portfolio?portfolioId=" + data2[j].portfolioId ,"GET",token, function(dummyvar){

    console.log(dummyvar);
    adressen.push(dummyvar.address);
    data.push(dummyvar);

      }, false);
    }
  } , false);
  console.log(adressen);

    console.log(data);
    if(getstatus() == 401){
        openMLogin();
    }else{
        if(getstatus() == 400 || getstatus() == 500 || getstatus() == 501){
            alert("Something went wrong, please try again later");
        }else{
            arrayforsaleown = data;
            App.setcontentcards(arrayforsaleown,"see-more-own",true,max_own,n_own);
        }
    }

},



setcontentcards: function(arrayport,seemoreid,boolown,max,n){
    var seemore = document.getElementById(seemoreid);
    var lengtharray = arrayport.length / 6;
    lengtharray = lengtharray.toFixed(0);
    if(lengtharray == 1 || lengtharray == 0){
        max = arrayport.length;
    }
    for(var i = n; i < max;i++){

                    App.setcard(arrayport,i,boolown);

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
                App.setcontentcards(arrayport,seemoreid,boolown,max,n);
            });
            seemore.style.display = "block";
            seemore.appendChild(a);
    }
},


setcard: function(data,i){
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

                  cardbody.innerHTML +=  "<h5 class='card-title'>"+data[i].name+"</h5>";
                  cardbody.innerHTML +=  "<p class='card-text' id='portfoliodata'>Buyers count: bla"+  +"<br />Profit made: blabla" +  +"</p>";
                  // cardbody.innerHTML +=  "<a href='datacenternew.php?portfolioId="+data[i].portfolioId+"' class='btn btn-primary'>Show data</a>";


                  var btncheck = document.createElement("div");
                  btncheck.setAttribute("class", "btn-check");
                  btncheck.setAttribute("id", "buyCheck");
                  btncheck.style.display="none";

                  cardbody.appendChild(btncheck);

                  var acheck = document.createElement("a");
                  acheck.setAttribute("class", "btn btn-buycheck btn-primary");
                  acheck.setAttribute("id", "buyCheck");
                  acheck.setAttribute("href", "boughtdata.php");
                  acheck.innerHTML = "View Data";

                  btncheck.appendChild(acheck);

                  var btnfault = document.createElement("div");
                  btnfault.setAttribute("id", "faultcheck");
                  btnfault.style.display="none";

                  cardbody.appendChild(btnfault);

                  var pcheck = document.createElement("p");
                  pcheck.innerHTML = "Either you are not logged in in metamask, Or you are not an actual buyer of this portfolio!<span><a href=''> Click here for help </a> </span></p>";

                  btnfault.appendChild(pcheck);


                  card.appendChild(cardbody);
                  cards.appendChild(card);

                  console.log(adressen.length);
                  for(var h = 0; h < adressen.length; h++){

                  App.contracts.DataContract.at(adressen[h]).then(function(instance){
                    DataContractInstance = instance;

                      web3.eth.getAccounts(function(error, accounts) {
                        var account = accounts[0];
                        console.log(account);
                    DataContractInstance.backers.call(account).then(function(r){
                      console.log(r);
                      setTimeout(function(){
                      if(r){
                          btncheck.style.display="block";
                          // $('.btn-buycheck').show();
                          // $('#buyCheck').show();
                        console.log('Person is a backer');
                      }
                      else if(r == false){
                          btnfault.style.display="block";
                          // $('.btn-fault').show();
                      }
                    }, 50)
                  }).catch(function(err){
                      console.log(err);
                    });
                  });
                })
              }

}






}


$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});

$('.btn-buycheck').click(function(){
  console.log("buy check clicked");
  App.isUserBacker();
});
