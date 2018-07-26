package cn.com.realer.pojo.vo;

import java.io.Serializable;

public class PoliceValueVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//省名
	private String province;
	//省內总警数
	private Integer policeCount;
	//省内 一式两队 总数
	private Integer twoTeamsCount;
	//省内 一室三队 总数
	private Integer  threeTeamsCount;
	//省内 其他 总数
	private String otherCount;
	//省内 一警多能 总数
	private Integer moreTeamsCount;
	
	
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public Integer getPoliceCount() {
		return policeCount;
	}
	public void setPoliceCount(Integer policeCount) {
		this.policeCount = policeCount;
	}
	public Integer getTwoTeamsCount() {
		return twoTeamsCount;
	}
	public void setTwoTeamsCount(Integer twoTeamsCount) {
		this.twoTeamsCount = twoTeamsCount;
	}
	public Integer getThreeTeamsCount() {
		return threeTeamsCount;
	}
	public void setThreeTeamsCount(Integer threeTeamsCount) {
		this.threeTeamsCount = threeTeamsCount;
	}
	public String getOtherCount() {
		return otherCount;
	}
	public void setOtherCount(String otherCount) {
		this.otherCount = otherCount;
	}
	public Integer getMoreTeamsCount() {
		return moreTeamsCount;
	}
	public void setMoreTeamsCount(Integer moreTeamsCount) {
		this.moreTeamsCount = moreTeamsCount;
	}
	
	
	
}
