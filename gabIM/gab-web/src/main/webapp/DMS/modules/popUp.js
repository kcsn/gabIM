gabFrame.popUp = function() {
	var popUp = {
		$e : null,
		title : '',
		width : '500px',
		// width:'100%',
		init : function() {
		}
	};
	return popUp;
};


/**
 * 定义输入框
 */
gabFrame.popUp_input = function(options) {
	var popUp_input = {
		$e : null,
		label_for : '',
		label_desc : '',
		input_name : '',
		input_placeholder : '',
		input_type : '',
		init : function() {
			this.$e = $('<div class="control-group"></div>');
			this.$label = $('<label class="control-label" for="'
					+ this.label_for + '">' + this.label_desc + '</label>');
			this.$div = $('<div class="controls"></div>');
			this.$input = $(' <input name="' + this.input_name + '" placeholder=""'
					+ this.input_placeholder + ' type="' + this.input_type
					+ '">');
			this.$div.append(this.$input);
			this.$e.append(this.$label);
			this.$e.append(this.$div);
		}
	}
	popUp_input.init();
	return popUp_input;
}

/**
 * 定义按钮
 */
gabFrame.popUp_button = function(options) {
       var popUp_button = {
    	$e : null,
    	botton_type : '',
    	botton_desc : '',
        init : function(){
        this.$e = $('<div class="controls"></div>');
        this.$botton = $('<button type=""'+this.botton_type+' class="btn">'+this.botton_desc+'</button>');
        }	   	   
       }
       popUp_button.init();
       return popUp_button;	
}

/**
 * 搜索按钮
 */
gabFrame.search = function(options){
	 var search = {
	 $e : null,
	 input_name:'',
	 input_placeholder : '',
	 init : function(){
	   this.$e = $('<div class="view"></div>');
	   this.$form = $('<form class="form-search"></form>');
	   this.$input = $('<input class="input-medium search-query" name="'+this.input_name+'" placeholder="'+this.input_placeholder+'" type="text">');
       this.$button = $('<button type="submit" class="btn">搜索</button>');
       this.$e.append(this.$form);
       this.$form.append(this.$input);
       this.$form.append(this.$button);
	 }		 
	 }
	search.init();
	return search;
}

/**
 * grid组件(快照管理)
 */ 
gabFrame.grid = function(options){
	var grid = {
	$e : null,
	span_desc : '',
	init : function(){
		this.$e = $('<div></div>');
		this.$span = $('<span>'+this.span_desc+'</span>');
		this.$button = $('<button type="submit">恢复</button>');
		this.$e.append(this.$span);
		this.$e.append(this.$button);
	}
	}
	grid.init();
	return grid;
}
 



/**
 * radio组件
 */
  gabFrame.radio = function(options){
	  var radio = {
	  $e : null,
	  radio_name : '',
	  radio_checked : '',
	  radio_desc :'',
	  init : function(){
	  this.$e = $('<input name="'+this.radio_name+'" type="radio" checked="'+this.radio_checked+'"/>'+this.radio_desc+'');	  
	  } 
	  }
	    
  }

  


