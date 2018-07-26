package cn.com.realer.pojo.vo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import cn.com.realer.pojo.GabMOptions;
import cn.com.realer.pojo.GabUValueDesc;

public class ItemVo implements Serializable {
     
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//item的id,
	private Integer id;
	//item的父id
	private Integer pid;
	//展示的位置
	private String itemType;
	//名字
	private String name;
	//是否是叶子节点
	private Integer isleaf;
	//item的类型
	private String inputType;
	//是否是必填的
	private Integer required;
	//隐藏文字
	private String placehold;
	//选项 --id value name selfformat  根据item code
	List<GabMOptions> options;
	//值描述  --id itemid optionsId value number 根据item id
	List<GabUValueDesc> gabUValueDescs;
	
	
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getItemType() {
		return itemType;
	}
	public void setItemType(String itemType) {
		this.itemType = itemType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getIsleaf() {
		return isleaf;
	}
	public void setIsleaf(Integer isleaf) {
		this.isleaf = isleaf;
	}
	public String getInputType() {
		return inputType;
	}
	public void setInputType(String inputType) {
		this.inputType = inputType;
	}
	public Integer getRequired() {
		return required;
	}
	public void setRequired(Integer required) {
		this.required = required;
	}
	public String getPlacehold() {
		return placehold;
	}
	public void setPlacehold(String placehold) {
		this.placehold = placehold;
	}

	public List<GabMOptions> getOptions() {
		return options;
	}
	public void setOptions(List<GabMOptions> options) {
		this.options = options;
	}
	public List<GabUValueDesc> getGabUValueDescs() {
		return gabUValueDescs;
	}
	public void setGabUValueDescs(List<GabUValueDesc> gabUValueDescs) {
		this.gabUValueDescs = gabUValueDescs;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	

}
