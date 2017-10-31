$(function(){
	$("#logapi").click(function(){
		getleft("log");
	});
	$("#protransaction").click(function(){
		getleft("product");
	});

});
function getleft(topic){
	$("#leftmenu").empty();
	$.ajax({
			type:"get",
			url:"/left/?menu="+topic,
			dataType:"html",
			beforeSend:function(xhr){
				xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
				xhr.setRequestHeader("content-type","application/json");
			},
			success:function(data){
				$("#leftmenu").html(data);
			},
			error:function(data){
				console.log(data);
			}
	});

}
function getright(topic){
	$("#rightbody").empty();
	$.ajax({
			type:"get",
			url:"/right/?menu="+topic,
			dataType:"html",
			beforeSend:function(xhr){
				xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
				xhr.setRequestHeader("content-type","application/json");
			},
			success:function(data){
				$("#rightbody").html(data);
			},
			error:function(data){
				console.log(data);
			}
	});

}
