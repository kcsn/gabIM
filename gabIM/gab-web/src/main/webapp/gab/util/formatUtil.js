/**
 * 
 */

function locationFormat(tr,value,config){
	var input='';
    value?'':value='';
    var tips='';
    var readonly=config.readonly;
    if(!readonly){
        tips='输入...';
    }
    var readonlystr= readonly?(' readonly="'+readonly+'"'):'';
    var hideStyle="";
    if(config.hidden){
        hideStyle="display:none;";
    }
    
    var $row=$('<div class="form-group" style="'+hideStyle+'"><label class="col-sm-3 control-label">'+config.text+'</label></div>');
    var $inputBox=$('<div class="col-sm-9"></div>');
    $row.append($inputBox);
    
    //封装一个省市区组件  提供设置选项  获取选项  如   citySelector   $inputBox.append(new citySelector(tr).$e); 
    
    $inputBox.html('<select id="g_f_locationId'+'" style="width:70px;border-radius: 5px;height: 33px;margin:0 20px 0 0;"><option value="1">test1</option><option value="2">test2</option><option value="3">test3</option></select>'+
    		'<select id="g_f_locationId'+'" style="width:70px;border-radius: 5px;height: 33px;margin:0 20px 0 0;"><option value="1">test1</option><option value="2">test2</option><option value="3">test3</option></select>'+
    		'<select id="g_f_locationId'+'" style="width:70px;border-radius: 5px;height: 33px;margin:0 20px 0 0;"><option value="1">test1</option><option value="2">test2</option><option value="3">test3</option></select>'+
    		'<select id="g_f_locationId'+'" style="width:70px;border-radius: 5px;height: 33px;margin:0 20px 0 0;"><option value="1">test1</option><option value="2">test2</option><option value="3">test3</option></select>');
    return $row.prop("outerHTML");
//    '+
//    '<input type="'+type+'" class="form-control" id="g_f_'+'" placeholder="'+tips+'" value="'+value+'" '+ readonlystr+'>
//    
//    var html='<div class="form-group" style="'+hideStyle+'"><label class="col-sm-3 control-label">'+config.text+'</label><div class="col-sm-9">'+
//        '<input type="'+type+'" class="form-control" id="g_f_'+'" placeholder="'+tips+'" value="'+value+'" '+ readonlystr+'></div></div>'
	
//	return '<select><option value="1">test1</option><option value="2">test2</option><option value="3">test3</option></select>';
}


function radioFormat(tr,value,config){
	var input='';
    value?'':value='';
    var tips='';
    var readonly=config.readonly;
    if(!readonly){
        tips='输入...';
    }
    var readonlystr= readonly?(' readonly="'+readonly+'"'):'';
    var hideStyle="";
    if(config.hidden){
        hideStyle="display:none;";
    }
    
    var $row=$('<div class="form-group" style="'+hideStyle+'"><label class="col-sm-3 control-label">'+config.text+'</label></div>');
    var $inputBox=$('<div class="col-sm-9"></div>');
    $row.append($inputBox);
    
    var options=[
                 {value:1,text:'通过'},
                 {value:2,text:'不通过'}
                 ];
    
    //封装一个省市区组件  提供设置选项  获取选项  如   citySelector   $inputBox.append(new citySelector(tr).$e); 
    value=value||1;
    for(var i=0;i<options.length;i++){
    	var checked=value==options[i].value?' checked':'';
    	var id_='g_f_'+config.value;
    	var $radio=$('<input id="'+id_+(i+1)+'" type="radio" '+checked+' name="'+id_+'" value="'+options[i].value+'" style="margin: 10px 2px 0 10px"><label for="'+id_+(i+1)+'">'+options[i].text+'</label>');
    	$inputBox.append($radio);
    }
//    $inputBox.html('<input id="g_f_'+config.value+'1" type="radio" name="g_f_'+config.value+'" value="1" style="margin: 10px 2px 0 10px"><label for="g_f_'+config.value+'1">通过</label>'+'<input id="g_f_'+config.value+'2" type="radio" name="g_f_'+config.value+'" value="2" style="margin: 10px 2px 0 10px"><label for="g_f_'+config.value+'2">不通过</label>');
    return $row.prop("outerHTML");
	
	
}



function categoryFormat(tr,value,config){
	var input='';
    value?'':value='';
    var tips='';
    var readonly=config.readonly;
    if(!readonly){
        tips='输入...';
    }
    var readonlystr= readonly?(' readonly="'+readonly+'"'):'';
    var hideStyle="";
    if(config.hidden){
        hideStyle="display:none;";
    }
    
    var $row=$('<div class="form-group" style="'+hideStyle+'"><label class="col-sm-3 control-label">'+config.text+'</label></div>');
    var $inputBox=$('<div class="col-sm-9"></div>');
    $row.append($inputBox);
    
    //封装一个省市区组件  提供设置选项  获取选项  如   citySelector   $inputBox.append(new citySelector(tr).$e); 
    
    $inputBox.html('<select id="g_f_categoryId'+'" style="width:70px;border-radius: 5px;height: 33px;margin:0 20px 0 0;"><option value="1">城区</option><option value="2">建制镇</option><option value="3">建制乡</option></select>'+
    		'<select id="g_f_categoryId'+'" style="width:70px;border-radius: 5px;height: 33px;margin:0 20px 0 0;"><option value="1">户籍</option><option value="2">治安</option><option value="3">水上</option></select>');
    return $row.prop("outerHTML");
}


function themeFormat(tr,value,config){
	var input='';
    value?'':value='';
    var tips='';
    var readonly=config.readonly;
    if(!readonly){
        tips=config.hint||'输入...';
    }
    var readonlystr= readonly?(' readonly="'+readonly+'"'):'';
    var hideStyle="";
    if(config.hidden){
        hideStyle="display:none;";
    }
    
    var $row=$('<div class="form-group" style="'+hideStyle+'"></div>');
    var $inputBox=$('<div class="col-sm-12"><input type="'+config.formtype+'" class="form-control" id="g_f_'+config.value+'" placeholder="'+tips+'" value="'+value+'" '+ readonlystr+'></div>');
    $row.append($inputBox);
    //封装一个省市区组件  提供设置选项  获取选项  如   citySelector   $inputBox.append(new citySelector(tr).$e); 
    return $row.prop("outerHTML");
}