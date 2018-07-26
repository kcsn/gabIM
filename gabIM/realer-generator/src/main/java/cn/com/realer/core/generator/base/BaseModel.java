package cn.com.realer.core.generator.base;
import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class BaseModel implements Serializable {
	private Integer id;
	private Date createTime;
	private Date updateTime;
	private Short isdelete;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the createTime
	 */
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * @param createTime
	 *            the createTime to set
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * @return the updateTime
	 */
	public Date getUpdateTime() {
		return updateTime;
	}

	/**
	 * @param updateTime
	 *            the updateTime to set
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}


	public Short getIsdelete() {
		return isdelete;
	}

	public void setIsdelete(Short deleted) {
		isdelete = deleted;
	}
}
