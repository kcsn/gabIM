package cn.com.realer.pojo.vo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class BlockVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//block的id,
	private Integer id;
	//block的名字
	private String name;
	//block的图标
	private String icon;
	//提交的状态
	private Short  status;
	//块节点集合
	List<ItemVo> itemVos;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public Short getStatus() {
		return status;
	}
	public void setStatus(Short status) {
		this.status = status;
	}
	public List<ItemVo> getItemVos() {
		return itemVos;
	}
	public void setItemVos(List<ItemVo> itemVos) {
		this.itemVos = itemVos;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	
	
	
}
