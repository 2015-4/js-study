   $(function(){
   	$("tr:even").css("background-color","#eee");
   	$(document).on("click","tr td",function(){
   	// 单个点击反复事件	
   	//	$(this).toggleClass("b-d")
   	
   	//  点击时当前出现某样式 ，
   		$("tr td").removeClass("b-d");
   		$(this).addClass("b-d")
   	})
   })

function showInfoTips(text) {
				$.dialog({
					content: "<p type='text-align:center;'>"+ text + "</p>", // 内容
					width: 400, // 宽度
					height:100,
					title:"<h3>温馨提示</h3>",
					cancel:function(){
						return true;
					},
					cancelText:'知道了',
					lock: true, // 是否锁屏
					zIndex: 9999 // z-index值
				});
			}

$(function(){
	$(document).on("click",".submit",function(){
		var username=$("#username").val();
		var password=$("#password").val();
		var password1=$("#password1").val();
		if(username.length==0){
			
			showInfoTips("请输入昵称");
            return;
			
		}else if(username.length>=7){
			showInfoTips("输入的用户名过长");
			return;
		}
		if(password.length==0){
			showInfoTips("请输入");
			
		}else if(password.length<=4){
			showInfoTips("输入的密码过短");
			
		}
		if(password1.length==0){
			showInfoTips("请再次输入密码");
		}else {
			showInfoTips("密码不一致")
		}
		
	})			
})










































