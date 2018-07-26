/**
 * Created by wunai on 2018/7/14.
 */
gabFrame.base_component=function(){
    var base_component={
        isChanged:function(){
            for(var i=0;i<this.children.length;i++){
                if(this.children[i].isChanged()){
                    return true;
                }
            }
            return false;
        },
        testTag:'',
        children:[],
        ajaxCollect:{},
        clear:function(){
            this.selfClear();
            for(var i=0;i<this.children.length;i++){
                var tag=this.children[i].tag;
                if(tag){
                    this[tag]==null;
                }
                this.children[i].clear();
            }
            this.clear_();
            this.$e.remove();
        },
        clear_:function(){
            //中断请求
            // alert(this.testTag);
            this.abort();
        },
        abort:function(tar){
            if(tar){
                if(this.ajaxCollect[tar]){
                    this.ajaxCollect[tar].abort();
                    this.ajaxCollect[tar]=null;
                }
            }else{
                for(var name in this.ajaxCollect){
                    if(this.ajaxCollect[name]){
                        this.ajaxCollect[name].abort();
                        this.ajaxCollect[name]=null;
                    }
                }
                this.ajaxCollect={};
            }
        },
        sendRequest:function(code,url,caller,data,title,Nasync,cache,dataType,type,errorCaller){
            try{
                this.abort(code);
            }catch (e){}
            this.ajaxCollect[code]=sendRequest(url,caller,data,title,Nasync,cache,dataType,type,errorCaller);
        },
        addControl:function($renderTo,control,tag){
            if($renderTo){
                $renderTo.append(control.$e);
            }
            this.children.push(control);
            if(tag){
                this[tag]=control;
                control.markKey=tag;
            }
        }
        ,
        selfClear:function(){

        }
    };
    return base_component;
};