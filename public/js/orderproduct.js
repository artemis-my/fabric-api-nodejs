$(function(){
	$("#getitem1").click(function(){
		var name=$("#itemname").val();
		if(name!=null&&name!=""){
			$("#itemlist").empty();
			getOneItem(name);
		}

	});
	$("#upitem").click(function(){
		$("#front").hide();
		$("#upitemdiv").show();
	});
	$("#upitem2").click(function(){
		var iname=$("#itemname2").val();
		var iproperty=$("#itemproperty2").val();
		var iprice=$("#itemprice2").val();
		var args=[iname,iproperty,iprice];
		upitem(args);
		$("#front").show();
		$("#upitemdiv").hide();
	});
	$("#cancelup").click(function(){
		$("#front").show();
		$("#upitemdiv").hide();
	});
	$("#downitem").click(function(){
		$("#downtips").show();
		$("#downtips2").show();
	});
	$("#downitem2").click(function(){
		var titems=$(".titems");
			for(var i=0;i<titems.length;i++){
				if($(titems[i]).is(":checked")){
					var name=$(titems[i]).parent().parent().children("td").eq(1).html();
					var property=$(titems[i]).parent().parent().children("td").eq(2).html();
					var args=[name,property];
					delOneItem(args);
				}
			}
			alert("删除成功");
			$("#downtips").hide();
			$("#downtips2").hide();
			//getAllItem("queryLogsByUser",sessionStorage.user);
	});
	$("#canceldown").click(function(){
		$("#downtips").hide();
		$("#downtips2").hide();
	});
})
function getOneItem(name){
	$.ajax({
		type:"get",
		url:"/channels/itemchannel/chaincodes/itemcc?peer=peer1&fcn=queryItemsByItemOwner&args=%5B%22"+name+"%22%2c%22%22%2c%22"+sessionStorage.user+"%22%5D",
		dataType:"text",
		beforeSend:function(xhr){
				xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
				xhr.setRequestHeader("content-type","application/json");
			},
		success:function(data){
			console.log(data);
		},
		error:function(data){
			console.log(data);
		}
	});
}
function upitem(args){
	$.ajax({
		type:"post",
		url:"/channels/itemchannel/chaincodes/itemcc",
		data:JSON.stringify({"fcn":"initItem","args":args}),
		dataType:"text",
		beforeSend:function(xhr){
				xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
				xhr.setRequestHeader("content-type","application/json");
			},
		success:function(data){
			if(data.indexOf("Fail")!=-1||data.indexOf("Error")!=-1){
					alert("上传失败");
				}else{
					alert("上传成功");
				}
		},
		error:function(data){

		}

	})
}
function delOneItem(args){
	$.ajax({
		type:"post",
		url:"/channels/itemchannel/chaincodes/itemcc",
		data:JSON.stringify({"fcn":"deleteItem","args":args}),
		dataType:"text",
		beforeSend:function(xhr){
				xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
				xhr.setRequestHeader("content-type","application/json");
			},
		success:function(data){

		},
		error:function(data){

		}
	})
}
function getOwnerItem(){
	$.ajax({
		type:"get",
		url:"/channels/itemchannel/chaincodes/itemcc?peer=peer1&fcn=queryItemsByItemOwner&args=%5B%22%22%2c%22%22%2c%22"+sessionStorage.user+"%22%5D",
		dataType:"text",
		beforeSend:function(xhr){
				xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
				xhr.setRequestHeader("content-type","application/json");
			},
		success:function(data){

		},

	})
}