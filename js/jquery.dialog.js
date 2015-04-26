(function($,window,undefined){
    
    //创建外部接口
    if(!window.ADS){window['ADS'] = {}}
   
    /**
     * 继承函数
     */
    function extend(subClass,superClass){
        var F = function(){};
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superClass = superClass.prototype;
        
        if(superClass.prototype.constructor == Object.prototype.constructor){
            superClass.prototype.constructor = superClass;
        }
    }    
    
    
    /**
     * 窗口父类
     */
    function Dialog(config){
        var defaults = {
            name:'',                  //窗口的类型
            width:'200',              //宽度
            height:'100',             //高度
            top:'50%',                //距离高度的位置
            left:'50%',               //距离右边的高度
            backgroundColor:'#000',   //背景颜色
            opacity:'0.8',            //背景颜色透明度
            icon:'',                  //提示图标的地址
            text:'',                  //提示的文字
            'zIndex':1000             //背景的层级
        };
        
        //接收外面传来的参数
        this.config = $.extend({},defaults,config);
        
        this.bgID = '';
    }
    
    
    /*
     * 获得样式
     */
    Dialog.prototype.getStyle = function(name){
        switch(name){
            
            case "TB_overlayMacFFBGHack":
            return {
                'position':'fixed',
                'z-index':this.config.zIndex,
                'top':'0px',
                'left':'0px',
                'height':'100%',
                'width':'100%',
                'background':this.config.backgroundColor
            };
            break;
            
            case "TB_overlayBG" :
            return {
                'position':'fixed',
                'z-index':this.config.zIndex,
                'top':'0px',
                'left':'0px',
                'height':'100%',
                'width':'100%',
                'background':this.config.backgroundColor,
                '-moz-opacity':this.config.opacity,
                'opacity':this.config.opacity
            }
            break;
            
            
            case "TB_HideSelect":
            return {
                "z-index":this.config.zIndex - 1,
                'position':'fixed',
                'top':0,
                'left':0,
                'background-color':'#fff',
                'border':"none",
                '-moz-opacity':0,
                'opacity':0,
                'width':'100%',
                'height':'100%'
            } 
            break;
        }
    }

   /**
    *创建黑背景 
    */
   Dialog.prototype.createBG = function(){
   
       //判断版本
        if(typeof document.body.style.maxHeight === 'undefined'){ //IE6
            $("body","html").css({
                height: "100%",
                width:"100%"
            });
            
            $("html").css({'overflow':'hidden'});
            
            //判断是否有iframe  是否有IE6
            if(document.getElementById("TB_HideSelect") === null){
                this.bgID = new Date().getTime();
                $("body").append("<iframe id='TB_HideSelect'></iframe><div id='"+this.bgID+"'></div>");
              
                $("#TB_HideSelect").css(this.getStyle("TB_HideSelect"));
                
                this.addCSSRule('* html #TB_HideSelect',"position: absolute;height: expression(document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px');");
            }
            
        }else{ 
          
            if(document.getElementById(this.bgID) === null){
                this.bgID = new Date().getTime();
                
                $("body").append("<div id='"+this.bgID+"'></div>");
               
            }
        }
        
        //判断不同类型的浏览器加载不同的样式
        if(this.tb_detectMaxXFF()){
            $("#"+this.bgID).css(this.getStyle("TB_overlayMacFFBGHack"));
        }else{
            $("#"+this.bgID).css(this.getStyle("TB_overlayBG"));
        }
        
        if(typeof document.body.style.maxHeight === 'undefined'){ //IE6
            var height = document.body.scrollHeight;
            $("#"+this.bgID).css({'position':'absolute','height':height});
        }
   }
   
   //判断浏览器 是不是苹果和火狐
   Dialog.prototype.tb_detectMaxXFF= function(){
       var a = navigator.userAgent.toLowerCase();
       if(a.indexOf('mac') != -1 && a.indexOf('firefox') != -1){
           return true;
       }
   }
   
   //关闭浮层
    Dialog.prototype.tb_remove = function(id){
       $("#"+this.bgID+",#TB_HideSelect").trigger("unload").unbind().remove();
       if(typeof document.body.style.maxHeight == 'undefined'){
           $("body","html").css({
               height:"auto",
               width:"auto"
           });
           
           $("html").css("overflow","");
       }
   }
   
   //添加样式
   Dialog.prototype.addCSSRule = function(key,value){
      var css = document.styleSheets[document.styleSheets.length - 1];
      css.cssRules ? (css.insertRule( key + "{" + value + "}", css.cssRules.length )) : (css.addRule(key,value));   
   }
   
   //删除样式
   Dialog.prototype.removeCSSRule = function(key){
       for(var i = 0,len = document.styleSheets.length - 1; i < len; i++){
          var css = document.styleSheets[i];
          css.cssRules ? (function(){
               for(var j = 0,len1 = css.cssRules.length ; j < len1 ; j++){
                   if(css.cssRules[j].selectorText == key){
                       css.deleteRule(j);
                   }
               }
          })(): (css.removeRule(key));
      }
   }
   
    /**
     * 普通弹出消息框
     */
    function AlertDialog(config,id){
       AlertDialog.superClass.constructor.call(this,config);
       this.id = id;
    }
    extend(AlertDialog,Dialog);
    
    
    /**
     *弹出浮层 
     */
    function LayerDialog(config){
        LayerDialog.superClass.constructor.call(this,config);
    }
    extend(LayerDialog,Dialog);
    
    
    /*
     * 弹出浮层打开方法
     */
   LayerDialog.prototype.open = function(config){
        var defaults = {
            id:'',
            isMask:true,
            //开始出场动画
            startAnimate:function(dialog){
                dialog.show().delay('500').animate({'top':'50%' });
            },//结束动画
            endAnimate:function(id){
                $("#"+id).fadeOut("fase",function(){});
            } 
        }
        
        this.conf = $.extend({},defaults,config);
        
        //没有遮罩
        if(this.conf.isMask){
          this.createBG();
        }
        
        this.id = this.conf.id;
        
        //判断id是否正确
        if((typeof this.conf.id  === 'string') && (this.conf.id !== '')){
            $this = $('#'+this.conf.id);
            var width = $this.width(),height = $this.height();
           
            if(typeof document.body.style.maxHeight === 'undefined'){
                var dialog = $this.css({
                   'top':'-50%',
                   'left':'50%',
                   'margin-left': '-'+width/2+'px',
                   'z-index':(this.config.zIndex + 1)
                });
 
                this.addCSSRule('* html #'+this.conf.id,"position: absolute;margin-top: expression(0 - parseInt(this.offsetHeight / 2) + (TBWindowMargin = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop) + 'px');");
                
            }else{
                var dialog = $this.css({
                   'position':'fixed',
                   'top':'-50%',
                   'left':'50%',
                   'margin-top':'-'+height/2+'px',
                   'margin-left': '-'+width/2+'px',
                   'z-index':(this.config.zIndex + 1)
                });
                
            }
            
            //出场动画
            this.conf.startAnimate(dialog);
            
        }else{
            alert('请先创建ID');
        }
       
   }
   
   /**
    *浮层关闭方法 
    */
   LayerDialog.prototype.close = function(){
       this.conf.endAnimate(this.id);
       this.tb_remove(this.id);
   }
  

   /**
    *窗体工厂 
    */
    var DialogFactory = {
         createDialog:function(config){
             var dialog;
             switch(config.name){
                 case 'alert':
                 dialog = new AlertDialog(config);
                 break;
                 
                 case 'layer':
                 dialog = new LayerDialog(config);
                 break;
                 
                 default:
                 dialog = new AlertDialog(config);
             }
             
             return dialog;
         }
     }
     
    var layout = function(options){
         return DialogFactory.createDialog(options);
    }
     
    window['ADS']['layout'] = layout;
    
})(jQuery,window);
