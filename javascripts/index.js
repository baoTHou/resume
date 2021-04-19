myReady(function(){
	//Gets the height of the screen 
    var windowH=document.documentElement.clientHeight||document.body.clientHeight;
    //Get all the classes on the page 
    var pageArray=getClass("div","page");
	getId("public-header").style.height=windowH+'px';
	for(var i=0;i<pageArray.length;i++){
      pageArray[i].style.height=windowH+'px';
	}
	//Back to the head 
	goTop("course-fixed");
    //open menu
    openMenu("main-nav");
});

//get ID
function getId(id){
	return document.getElementById(id);
}

//get class
function getClass(tagName,className){                          //获得标签名为tagName,类名className的元素
    if(document.getElementsByClassName){                       //支持这个函数
        return document.getElementsByClassName(className);
    }else{       
        var tags=document.getElementsByTagName(tagName);        //获取标签
        var tagArr=[];                                          //用于返回类名为className的元素
        for(var i=0;i < tags.length; i++){
            if(tags[i].class == className){
                tagArr[tagArr.length] = tags[i];                //保存满足条件的元素
            }
        }
        return tagArr;
    }
}

//get addclass
function addClass(obj, cls){
    var obj_class = obj.className;//获取 class 内容.
    var blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
}

//get removeClass 
function removeClass(obj, cls){
    var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
    var removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;//替换原来的 class.
}

//get hasClass
function hasClass(obj, cls){
    var obj_class = obj.className;//获取 class 内容.
    var obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
    var x = 0;
    for(x in obj_class_lst) {
        if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
            return true;
        }
    }
    return false;
}

//get toggleClass
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}  

//Back to the head 
function goTop(id){
    var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
    var times=null;
    var isTop=true;
    window.onscroll=function(){
        var osTop=document.documentElement.scrollTop||document.body.scrollTop;
        if(osTop>=clientHeight){
            getId(id).style.display='block';
        }else{
            getId(id).style.display='none';
        }
        if(!isTop){
            clearInterval(times);
        }
        isTop=false;
    }
    getId(id).onclick=function(){
        times=setInterval(function(){
            var osTop=document.documentElement.scrollTop||document.body.scrollTop;
            var speed=Math.floor(-osTop/6);
            document.documentElement.scrollTop=document.body.scrollTop=osTop+speed;
            isTop=true;
            if(osTop==0){
                clearInterval(times);
            }
        },30);
    }
}


//menu
function openMenu(id){  
    getId(id).onclick=function(e){
        e.preventDefault();
        var isLocated = false; 
       var nav=getId("nav-wrap"),
            navs=getClass("a","list-nav");
        if(!hasClass(nav,'active')&&!isLocated){          
            var width = nav.offsetWidth, radius = width / 2;// 圆的半径 raduis 
            var startAngle = 0, endAngle = 360;// 圆形菜单的起始、终止角度           
            var total = navs.length, gap = (endAngle - startAngle)/total;// 两个子菜单间的夹角 gap   
            var radian = Math.PI / 180;// 角度->弧度

            for(var i=0;i<navs.length;i++){           
                var myAngle = (startAngle + gap*i) * radian;  // θ// 当前子菜单与x轴正向的夹角 θ （角度->弧度）            
                var myX = radius + radius * Math.cos( myAngle ), // x=r+rcos(θ)// 计算当前子菜单相对于左上角(0,0)的坐标 (x,y)
                    myY = radius + radius * Math.sin( myAngle ); // y=r+rsin(θ)             
                navs[i].style.left=myX+ 'px';// 设置当前子菜单的位置 (left,top) = (x,y)
                navs[i].style.top= myY+ 'px';
            }            
            isLocated = false;     
        }
        toggleClass(nav, "active");
    } 

}

