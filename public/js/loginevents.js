$(function(){
	$("#nameerr").text("");
	$("#pwderr").text("");
	var err="${loginerr}";
	if(err=="nameerr"){
		$("#nameerr").text("账号不存在");
	}else if(err=="pwderr"){
		$("#pwderr").text("密码错误");
	}
});
function sub(){
	var name=$("#username").val();
	var pwd=$("#password").val();
	if(name==""){
		$("#nameerr").text("请输入账号");
		return false;
	}
	if(pwd==""){
		$("#pwderr").text("请输入密码");
		return false;
	}
	$("#nameerr").text("");
	$("#pwderr").text("");
	return true;
}