	var tempsavelog;
	$(function(){
		//sessionStorage.token="<%=token%>";
		//sessionStorage.user="<%=user%>";
		//getAllLog("queryLogsByUser",sessionStorage.username);
var options={
                bootstrapMajorVersion:3,    //版本
                currentPage:1,    //当前页数
                numberOfPages:5,    //最多显示Page页
                totalPages:10,    //所有数据可以显示的页数
		itemTexts: function (type, page, current) {
		    switch (type) {
		        case "first":
		            return "首页";
		        case "prev":
		            return "上一页";
		        case "next":
		            return "下一页";
		        case "last":
		            return "末页";
		        case "page":
		            return page;
           	 }
        },
                onPageClicked:function(e,originalEvent,type,page){
				getAll(page);

                }
            }
            $("#page").bootstrapPaginator(options);
		getAll(1);
		$("#sendbtn").click(function(){
			$("#front").hide();
			$("#sendlogdiv").show();
		});
		$("#sendlog").click(function(){
			var logname=$("#logname2").val();
			var logg=$("#log2").val();
			var arg=[logname,logg];
			$.ajax({
				type:"post",
				url:"/channels/logchannel/chaincodes/logcc",
				data:JSON.stringify({"args":arg,"fcn":"uploadLog"}),
				dataType:"text",
				beforeSend:function(xhr){
					xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
					xhr.setRequestHeader("content-type","application/json");
				},
				success:function(data){
					console.log(data);
					if(data.indexOf("Fail")!=-1||data.indexOf("Error")!=-1){
						alert("上传失败");
					}else{
						alert("上传成功");
					}
					getAllLog("queryLogsByUser",sessionStorage.username);
					$("#front").show();
					$("#sendlogdiv").hide();
				}
			});
		});
		$("#cancel").click(function(){
			$("#front").show();
			$("#sendlogdiv").hide();
		});
		$("#dellog").click(function(){
			$("#downtips").show();
			$("#downtips2").show();
		});
		$("#seltotal").click(function(){
			if($(this).is(':checked')){
				$(".tlog").attr("checked",true);
			}else{
				$(".tlog").attr("checked",false);
			}

		});
		$("#dellog3").click(function(){
			var tlogs=$(".tlog");
			for(var i=0;i<tlogs.length;i++){
				if($(tlogs[i]).is(":checked")){
					var name=$(tlogs[i]).parent().parent().children("td").eq(1).html();
					delOneLog(name);
				}
			}
			$("#downtips").hide();
			$("#downtips2").hide();
			getAllLog("queryLogsByUser",sessionStorage.username);
		});
		$("#canceldel").click(function(){
			$("#downtips").hide();
			$("#downtips2").hide();
		});
		$("#loglist").on("click",".delone",function(){
			$(this).parent().parent().children(":first").children().attr("checked",true);
			$("#downtips").show();
			$("#downtips2").show();
		});
		$("#loglist").on("click",".look",function(){
			var infoname=$(this).parent().parent().children("td").eq(1).html();
			var infoinfo=$(this).parent().parent().children("td").eq(2).html();
			$("#infologname").html(infoname);
			$("#infologinfo").html(infoinfo);
			$("#oneloginfo").show();
		});
		$("#closeinfo").click(function(){
			$("#oneloginfo").hide();
		});
		$("#getlog").click(function(){
			var lname=$("#logname").val();
			var useraccount=$("#username").val();
			var fcn="";
			var args="";
			if(lname!=null&&lname!==""){
				fcn="readLog";
				args=lname;			
			}else if(useraccount!=null&&useraccount!=""){
				fcn="queryLogsByUser";
				args=useraccount;
			}else{
				fcn="queryLogsByUser";
				args=sessionStorage.username;			
			}
			getAllLog(fcn,args);
		})
	});
	function delOneLog(name){
		$.ajax({
				type:"post",
				url:"/channels/logchannel/chaincodes/logcc",
				data:JSON.stringify({"args":[name],"fcn":"deleteLog"}),
				dataType:"text",
				beforeSend:function(xhr){
					xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
					xhr.setRequestHeader("content-type","application/json");
				},
				success:function(data){
					//console.log(data);
					if(data.indexOf("Fail")!=-1||data.indexOf("Error")!=-1){
						alert("删除失败");
					}else{
						alert("删除成功");
					}
					//getAllLog();
					//$("#downtips").hide();
				}
			})
	}
function getAllLog(fcn,args){
$("#loglist").empty();
		$.ajax({
			type:"get",
			url:"/channels/logchannel/chaincodes/logcc?peer=peer1&fcn="+fcn+"&args=%5B%22"+args+"%22%5D",
			dataType:"text",
			beforeSend:function(xhr){
				xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
				xhr.setRequestHeader("content-type","application/json");
			},
			success:function(data){
				console.log(data);
				var st=data.indexOf("[");
				if(st!=-1){
				var end=data.indexOf("]");
				var newdata=data.substring(st,end+1);
				var jsdata=JSON.parse(newdata);
				tempsavelog=jsdata;
				for(var i=0;i<jsdata.length;i++){
					var record=jsdata[i].Record;
					var $trs=$("<tr><td><input type='checkbox' class='tlog' pid='"+i+"'></td><td>"+record.name+"</td><td>"+record.logContent+"</td><td>"+record.uploadTime+"</td><td>"+record.user+"</td><td><a style='margin:0 5px;' class='look'>查看</a><a style='margin:0 5px;' class='delone'>删除</a></td></tr>");
					$("#loglist").append($trs);
				}
				}else{
					st=data.indexOf("{");
					var end=data.indexOf("}");
				var newdata=data.substring(st,end+1);
				var jsdata=JSON.parse(newdata);
					var $trs=$("<tr><td><input type='checkbox' class='tlog' pid='1'></td><td>"+jsdata.name+"</td><td>"+jsdata.logContent+"</td><td>"+jsdata.uploadTime+"</td><td>"+jsdata.user+"</td><td><a style='margin:0 5px;' class='look'>查看</a><a style='margin:0 5px;' class='delone'>删除</a></td></tr>");

					$("#loglist").append($trs);
				}
			},
			error:function(data){
			console.log(data);
			}	
		});
}
function getAll(page){
	$("#loglist").empty();
	$.ajax({
			type:"get",
			url:"/getallinfo/channels/logchannel/chaincodes/logcc?peer=peer1&topic=2&page="+page,
			dataType:"text",
			beforeSend:function(xhr){
				xhr.setRequestHeader("authorization","Bearer "+sessionStorage.token);
				xhr.setRequestHeader("content-type","application/json");
			},
			success:function(data){
				console.log(data);
				var st=data.indexOf("[");
				if(st!=-1){
				var end=data.indexOf("]");
				var newdata=data.substring(st,end+1);
				var jsdata=JSON.parse(newdata);
				tempsavelog=jsdata;
				for(var i=0;i<jsdata.length;i++){
					var record=jsdata[i].Record;
					var $trs=$("<tr><td><input type='checkbox' class='tlog' pid='"+i+"'></td><td>"+record.name+"</td><td>"+record.logContent+"</td><td>"+record.uploadTime+"</td><td>"+record.user+"</td><td><a style='margin:0 5px;' class='look'>查看</a><a style='margin:0 5px;' class='delone'>删除</a></td></tr>");
					$("#loglist").append($trs);
				}
				}else{
					st=data.indexOf("{");
					var end=data.indexOf("}");
				var newdata=data.substring(st,end+1);
				var jsdata=JSON.parse(newdata);
					var $trs=$("<tr><td><input type='checkbox' class='tlog' pid='1'></td><td>"+jsdata.name+"</td><td>"+jsdata.logContent+"</td><td>"+jsdata.uploadTime+"</td><td>"+jsdata.user+"</td><td><a style='margin:0 5px;' class='look'>查看</a><a style='margin:0 5px;' class='delone'>删除</a></td></tr>");

					$("#loglist").append($trs);
				}
			},
			error:function(data){
			console.log(data);
			}	
		});
}
