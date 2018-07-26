package cn.com.realer.pojo.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class MessageVo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
    
	//标题
	private String title;
	//内容
	private String Content;
	//警局名
	private String policeName;
	//创建时间 
	private Date createTime;
	//评论条数
	private Integer count;
	//浏览次数
	private Integer visitCount;
	//评论内容
	private List<MessageVo> mesList;
	private Integer rootId;
	
	public Integer getRootId() {
		return rootId;
	}
	public void setRootId(Integer rootId) {
		this.rootId = rootId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return Content;
	}
	public void setContent(String content) {
		Content = content;
	}
	public String getPoliceName() {
		return policeName;
	}
	public void setPoliceName(String policeName) {
		this.policeName = policeName;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public Integer getVisitCount() {
		return visitCount;
	}
	public void setVisitCount(Integer visitCount) {
		this.visitCount = visitCount;
	}
	public List<MessageVo> getMesList() {
		return mesList;
	}
	public void setMesList(List<MessageVo> mesList) {
		this.mesList = mesList;
	}
	
	
}
