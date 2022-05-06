var button=document.getElementById('button');
var clear=document.getElementById('clear');
var data = JSON.parse(localStorage.getItem('BMIData')) || [];
var list=document.querySelector('.listtext');
var result=document.querySelector('.result');
var r=document=document.querySelector('.return');

button.addEventListener('click',count);
r.addEventListener('click',backbutton);
clear.addEventListener('click',clearList);
document.onkeydown=function(e){
    var event=e ||event
    if(event.keyCode==13){
        count();
    }
}

//將按鈕恢復成BMI按鈕
function backbutton(){
    result.innerHTML='<input type="button" id="button" value="看結果" style="border: #fff;font-family: PingFangTC-Regular;color:#424242;   background-color: #FFD366;">'
    r.style.zIndex = -5;
    var button=document.getElementById('button');
    button.addEventListener('click',count);
}


//計算BMI
function count(){
    var h=parseFloat(document.getElementById('height').value);
    var w=parseFloat(document.getElementById('weight').value);


    //將顏色、肥胖程度、BMI、身高及體重包裝成物件
    var todo={
        color:'',
        text:'',
        BMI:'',
        weight:'',
        height:''
    };
    todo.weight=w;
    todo.height=h;
    todo.BMI=Math.round(10000*w/(h*h));
    if(parseInt(todo.BMI)<18.5){
        todo.color='#31BAF9';
        todo.text='過輕';
    }else if(parseInt(todo.BMI)<24){
        todo.color='#86D73F';
        todo.text='理想';
    }else if(parseInt(todo.BMI)<27){
        todo.color='#FF982D';
        todo.text='過重';
    }else if(parseInt(todo.BMI)<30){
        todo.color='#FF6C03';
        todo.text='輕度肥胖';
    }else if(parseInt(todo.BMI)<35){
        todo.color='#FF5F5F';
        todo.text='中度肥胖';
    }else if(parseInt(todo.BMI)>=35){
        todo.color='#FF1200';
        todo.text='重度肥胖';
    }
    if(document.getElementById('height').value==''||document.getElementById('weight').value==''){
        return;
    }


    //改變按鈕成BMI值 
    result.innerHTML='<input type="button" id="button" value="'+todo.BMI+'" style="color:'+todo.color+';background:none;border:6px solid"+'+todo.color+';font-size:32px"><br><div style="color:'+todo.color+';font-size:20px;position:relative;left:43px;bottom:50px">BMI</div>'
    r.style.zIndex=1;
    r.style.backgroundColor=todo.color;
    r.style.border="solid 3px #424242";

    //將物件放入loacalStorage並更新底下表格
    data.push(todo);
    updataList(data);
    localStorage.setItem('BMIData',JSON.stringify(data));
}


//更新底下表格
function updataList(items){  
    str='';
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day  = date.getDate();
    var hours = date.getHours();
    var len=items.length;
    for(var i = 0;i<len;i++){
        str+='<div class="history" data-index= '+i+' style="border-left:7px solid '+items[i].color+'; background:#FFF;">'+items[i].text+'<div class="block"><span>BMI</span> '+items[i].BMI+'</div><div class=block><span>weight</span> '+items[i].weight+'kg</div><div class=block><span>height</span> '+items[i].height+'cm</div><div class="block"><span>'+month+'-'+day+'-'+year+'</span></div></div>';
        
    }
    list.innerHTML=str;
}


//清除底下表格
function clearList(){
    data=[];
    updataList(data);
}

updataList(data);



