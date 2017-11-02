$(function(){
	$("#user").html(sessionStorage.username);
	$("#logapi").click(function(){
		getleft("log");
		getright("orderlog");
	});
	$("#protransaction").click(function(){
		getleft("product");
		getright("orderproduct");
	});
	$("#leftmenu").on('click','#explorer',function(){
		getright("explorer");
	});
	$("#leftmenu").on('click','#orderlog',function(){
		getright("orderlog");
	});
	$("#leftmenu").on('click','#orderproduct',function(){
		getright("orderproduct");
	});
	$("#leftmenu").on('click','#producttransaction',function(){
		getright("producttransaction");
	});
	$("#leftmenu").on('click','#accountinfo',function(){
		getright("accountinfo");
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
