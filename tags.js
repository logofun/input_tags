
(function () {
    tags = [];
    function showtag(ehandel,arr){
        //在指定元素前显示标签
        //ehandel为元素句柄
        //arr为数组
        let html = '';
        for( let i=0; i<arr.length; ++i ){
            html +='<span>' + arr[i] + '<button class=\'close\'></button></span>';
        }
        console.log(html);
        ehandel.insertAdjacentHTML('beforebegin',html);
    }
    

    function delbtn(e){
        //响应删除标签
        //btn为元素句柄 nodelist集
        let btn = document.querySelectorAll("button.close");
        for(let i=0;i<btn.length;i++){
            btn[i].addEventListener("click",function(event){
                event.preventDefault();
                // 存在点击多次click的情况
                let delname = this.parentNode.innerText;
                console.log(delname);

                let pbtn = this.parentNode;
                pbtn.parentNode.removeChild(pbtn);

                let index = tags.indexOf(delname);
                if(index >= 0){
                    tags.splice(index,1);
                    e.value = tags.join(',');
                }
                
            })
        }
    }
    
    
    function init(e,d){
        let ie = document.getElementById(e); //input_tags元素
        let id = document.getElementById(d); //input_content元素
        tags = (ie.value).split(','); //标签集 数组形式

        showtag(id,tags);
        delbtn(ie);
        // 给input_content添加回车或空格事件
        id.addEventListener("keypress",function(event){
            if(event.keyCode == 13 || event.keyCode == 32){
                event.preventDefault();
                
                let tag = id.value;
                if(tag){
                    console.log(tag);
                    if(tags.indexOf(tag) >= 0){
                        //重复时需要红色显示
                        console.log('duplicate');
                        id.className += '  duplicate';
                        //id.value='';
                        return false; //
                    }
                id.className = 'input_content';
                
                tags.push(tag);
                //console.log(tags);
                showtag(id,tags.slice(-1));
                delbtn(ie);
                id.value='';
                ie.value=tags.join(',');
                console.log(ie.value);
                }
            }else if(event.keyCode == 8){
                
            }else{
               id.className = 'input_content'; 
            }

        });

    }
    
    init("input_tags","input_content");

}())
