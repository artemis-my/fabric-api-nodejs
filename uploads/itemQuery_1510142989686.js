function getAllItemOtherUser(){
        var logArr;
            $.ajax({
                type:"get",
                url:"/channels/itemchannel/chaincodes/itemcc?peer=peer1&fcn=queryItemsByItemPropertyOwner&args=%5B%22%22%2c%22%22%2c%22%22%5D",
                dataType:"text",
                beforeSend:function(xhr){
                    xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
                    xhr.setRequestHeader("content-type","application/json");
                },
                success:function(data){
                    console.log(data);
                    var st=data.indexOf("[");
                    var end=data.indexOf("]");
                    var newdata=data.substring(st,end+1);
                    var jsdata=JSON.parse(newdata);
                    logArr = jsdata
                },
                error:function(data){
                console.log(data);
                }	
            });
            return logArr;
    }



    function getAllItemOwn(){
        var logArr;
            $.ajax({
                type:"get",
                url:"/channels/itemchannel/chaincodes/itemcc?peer=peer1&fcn=queryItemsByItemPropertyOwner&args=%5B%22%22%2c%22%22%2c%22"+sessionStorage.user+"%22%5D",
                dataType:"text",
                beforeSend:function(xhr){
                    xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
                    xhr.setRequestHeader("content-type","application/json");
                },
                success:function(data){
                    console.log(data);
                    var st=data.indexOf("[");
                    var end=data.indexOf("]");
                    var newdata=data.substring(st,end+1);
                    var jsdata=JSON.parse(newdata);
                    logArr = jsdata
                },
                error:function(data){
                console.log(data);
                }	
            });
            return logArr;
    }




    $.ajax({
        type:"post",
        url:"/channels/itemchannel/chaincodes/itemcc",
        data:JSON.stringify({"args":arg,"fcn":"initItem"}),
        dataType:"text",
        beforeSend:function(xhr){
            xhr.setRequestHeader("authorization","Bearer "+token);
            xhr.setRequestHeader("content-type","application/json");
        },
        success:function(data){
            console.log(data);
            if(data.indexOf("Fail")!=-1||data.indexOf("Error")!=-1){
                alert("上链失败");
            }else{
                alert("上链成功");
            }
            getAllItemOwn();
            $("#front").show();
            $("#sendlogdiv").hide();
        }
    })