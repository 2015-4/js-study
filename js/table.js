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
// function Dialog(config){
//      var defaults = {
//          name:'',                  //窗口的类型
//          width:'200',              //宽度
//          height:'100',             //高度
//          top:'50%',                //距离高度的位置
//          left:'50%',               //距离右边的高度
//          backgroundColor:'#000',   //背景颜色
//          opacity:'0.8',            //背景颜色透明度
//          icon:'',                  //提示图标的地址
//          text:'',                  //提示的文字
//          'zIndex':1000             //背景的层级
//      };
//      
//      //接收外面传来的参数
//      this.config = $.extend({},defaults,config);
//      
//      this.bgID = '';
//  }
function showInfoTips(text) {
				var dialog=({
					content: "<p type='text-align:center;'>"+ text + "</p>", // 内容
					width: 400, // 宽度
					height:100,
					cancel:function(){
						return true;
					},
					cancelText:'知道了',
					lock: true, // 是否锁屏
					zIndex: 9999 // z-index值
				});
			}


//function showInfoTips(text) {
//				 $.dialog({
//					content: "<p type='text-align:center;'>"+ text + "</p>", // 内容
//					width: 400, // 宽度
//					height:100,
//					cancel:function(){
//						return true;
//					},
//					cancelText:'知道了',
//					lock: true, // 是否锁屏
//					zIndex: 9999 // z-index值
//				});
//			}
function show1(){
			$.messager.show({
				title:'My Title',
				msg:'Message will be closed after 4 seconds.',
				showType:'show'
			});
		}

$(function(){
	$(document).on("click",".submit",function(){
		var username=$("#username").val();
		var password=$("#password").val();
		var password1=$("#password1").val();
		if(username.length==0){
			
			alert("请输入用户名")
			return;
			
		}else if(username.length>=7){
			alert("输入的用户名过长");
			return;
		}
		if(password.length==0){
			alert("请输入密码");
			
		}else if(password.length<=4){
			alert("输入的密码过短");
			
		}
		if(password===password1){
			alert("密码一致");
		}else {
			alert("密码不一致")
		}
		
	})			
})











//$(function(){
//	$(document).on("click",".submit",function(){
//		var username=$("#username").val();
//		if(username.length==""){
//			alert("请输入用户名");
//			
//		}else if(username.length>=7){
//			alert("输入的用户名过长")			
//		}								
//	})			
//})






























