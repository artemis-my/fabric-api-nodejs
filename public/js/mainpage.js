$(function(){
	$("#user").html(sessionStorage.username);
	$("#logapi").click(function(){
		getleft("log");
		getright("orderlog");
	}).hover(over,out);
	$("#protransaction").click(function(){
		getleft("product");
		getright("orderproduct");
	}).hover(over,out);
	$("#leftmenu").on('click','#explorer1',function(){
		$("#rightbody").empty();
		//$("#rightbody").html("<iframe width=800px height=800px src=></iframe>")
		$explo=$("<iframe width=90% height=100%></iframe>");
		$explo.attr("src","//172.20.29.20:8080/");
		$("#rightbody").append($explo);
	});
	$("#leftmenu").on('click','#explorer2',function(){
		$("#rightbody").empty();
		//$("#rightbody").html("<iframe width=800px height=800px src=></iframe>")
		$explo=$("<iframe width=90% height=100%></iframe>");
		$explo.attr("src","//172.20.29.20:8080/");
		$("#rightbody").append($explo);
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
	$("#leftmenu").on('click','#help',function(){
		getright("help");
	});
	$("#logout").click(function(){
		sessionStorage.clear();
		window.location.href="/users/login";
	});
	$("#user").click(function(){
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
function over(){
	$(this).addClass("cur");
}
function out(){
	$(this).removeClass("cur");
}
