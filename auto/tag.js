 (function () {
    var tags = [];
	var elInputContent;
	var elInputTags;
	// var InputTag = init; //用于外部函数调用

	function init(d,e){
		elInputContent = document.getElementById(d);
		elInputTags = document.getElementById(e);
		tags = elInputTags.value.split(',');
		showTag(tags);
		btnInit();
		keyInit();
	}

	function addTags(name){ //添加tag
		tags.push(name);
		elInputTags.value = tags.join(',');
		elInputContent.value = '';
	}
	
	function delTags(name){ //删除tag
		let index = tags.indexOf(name)
		if(index >= 0){
			tags.splice(index,1);
		}
		elInputTags.value = tags.join(',');
	}
	
	function showTag(arr){ //在指定元素前显示标签 arr为数组
        let html = '';
        if (arr.length==1 && arr[0]=='') { //判断arr为空数组
            let html = '';
        }else {
            for( let i=0; i<arr.length; ++i ){
                html +='<span>' + arr[i] + '<button class=\'close\'></button></span>';
            }
        }
        //console.log(html);
        elInputContent.insertAdjacentHTML('beforebegin',html);
    }
 
    function btnInit(){ //初始化删除按钮事件
        let btn = document.querySelectorAll("button.close");
        for(let i=0;i<btn.length;i++){
            btn[i].onclick=function(event){
                event.preventDefault();
               
                let delname = this.parentNode.innerText;
                //console.log(delname);

                let fbtn = this.parentNode;
                fbtn.parentNode.removeChild(fbtn);
				
				delTags(delname);
            }
        }
    }
    
    function keyInit(){ //初始化按键事件
        // 给input_content添加回车或空格事件
        elInputContent.addEventListener("keypress",function(event){
            if(event.keyCode == 13 || event.keyCode == 32){
                event.preventDefault();
                
                let tag = elInputContent.value;
                if(tag){
                    //console.log(tag);
                    if(tags.indexOf(tag) >= 0){
                        //重复时需要红色显示
                        //console.log('duplicate');
                        elInputContent.className += '  duplicate';
                        //elInputContent.value='';
                        return false; //
                    }
                elInputContent.className = 'input_content';

				addTags(tag);
                showTag(tags.slice(-1));
                btnInit();
				
                }
            }else{
               elInputContent.className = 'input_content'; 
            }
        });
		// 给input_content添加退格事件
		elInputContent.addEventListener("keydown",function(event){
			if(event.keyCode == 8){
				let tag = elInputContent.value;
                if(!tag){
					let ib = document.querySelectorAll("button.close");
					//console.log(ib.length);
					if(ib.length >= 1){
						ib[ib.length-1].click(event);
					}
				}
			}
		})

    }
    
    init("input_content","input_tags");

}())
