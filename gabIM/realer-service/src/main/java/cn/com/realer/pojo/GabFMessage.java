package cn.com.realer.pojo;

import cn.com.realer.core.generator.base.BaseModel;

@SuppressWarnings("serial")
public class GabFMessage extends BaseModel {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_f_message.title_
     *
     * @mbggenerated
     */
    private String title;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_f_message.content_
     *
     * @mbggenerated
     */
    private String content;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_f_message.police_name
     *
     * @mbggenerated
     */
    private String policeName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_f_message.parent_id
     *
     * @mbggenerated
     */
    private Integer parentId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_f_message.root_id
     *
     * @mbggenerated
     */
    private Integer rootId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_f_message.visit_count
     *
     * @mbggenerated
     */
    private Integer visitCount;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_f_message.police_id
     *
     * @mbggenerated
     */
    private Integer policeId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_f_message.status
     *
     * @mbggenerated
     */
    private Integer status;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_f_message.title_
     *
     * @return the value of gab_f_message.title_
     *
     * @mbggenerated
     */
    public String getTitle() {
        return title;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_f_message.title_
     *
     * @param title the value for gab_f_message.title_
     *
     * @mbggenerated
     */
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_f_message.content_
     *
     * @return the value of gab_f_message.content_
     *
     * @mbggenerated
     */
    public String getContent() {
        return content;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_f_message.content_
     *
     * @param content the value for gab_f_message.content_
     *
     * @mbggenerated
     */
    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_f_message.police_name
     *
     * @return the value of gab_f_message.police_name
     *
     * @mbggenerated
     */
    public String getPoliceName() {
        return policeName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_f_message.police_name
     *
     * @param policeName the value for gab_f_message.police_name
     *
     * @mbggenerated
     */
    public void setPoliceName(String policeName) {
        this.policeName = policeName == null ? null : policeName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_f_message.parent_id
     *
     * @return the value of gab_f_message.parent_id
     *
     * @mbggenerated
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_f_message.parent_id
     *
     * @param parentId the value for gab_f_message.parent_id
     *
     * @mbggenerated
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_f_message.root_id
     *
     * @return the value of gab_f_message.root_id
     *
     * @mbggenerated
     */
    public Integer getRootId() {
        return rootId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_f_message.root_id
     *
     * @param rootId the value for gab_f_message.root_id
     *
     * @mbggenerated
     */
    public void setRootId(Integer rootId) {
        this.rootId = rootId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_f_message.visit_count
     *
     * @return the value of gab_f_message.visit_count
     *
     * @mbggenerated
     */
    public Integer getVisitCount() {
        return visitCount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_f_message.visit_count
     *
     * @param visitCount the value for gab_f_message.visit_count
     *
     * @mbggenerated
     */
    public void setVisitCount(Integer visitCount) {
        this.visitCount = visitCount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_f_message.police_id
     *
     * @return the value of gab_f_message.police_id
     *
     * @mbggenerated
     */
    public Integer getPoliceId() {
        return policeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_f_message.police_id
     *
     * @param policeId the value for gab_f_message.police_id
     *
     * @mbggenerated
     */
    public void setPoliceId(Integer policeId) {
        this.policeId = policeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_f_message.status
     *
     * @return the value of gab_f_message.status
     *
     * @mbggenerated
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_f_message.status
     *
     * @param status the value for gab_f_message.status
     *
     * @mbggenerated
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_f_message
     *
     * @mbggenerated
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", title=").append(title);
        sb.append(", content=").append(content);
        sb.append(", policeName=").append(policeName);
        sb.append(", parentId=").append(parentId);
        sb.append(", rootId=").append(rootId);
        sb.append(", visitCount=").append(visitCount);
        sb.append(", policeId=").append(policeId);
        sb.append(", status=").append(status);
        sb.append("]");
        return sb.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_f_message
     *
     * @mbggenerated
     */
    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        GabFMessage other = (GabFMessage) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getContent() == null ? other.getContent() == null : this.getContent().equals(other.getContent()))
            && (this.getPoliceName() == null ? other.getPoliceName() == null : this.getPoliceName().equals(other.getPoliceName()))
            && (this.getParentId() == null ? other.getParentId() == null : this.getParentId().equals(other.getParentId()))
            && (this.getRootId() == null ? other.getRootId() == null : this.getRootId().equals(other.getRootId()))
            && (this.getVisitCount() == null ? other.getVisitCount() == null : this.getVisitCount().equals(other.getVisitCount()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getIsdelete() == null ? other.getIsdelete() == null : this.getIsdelete().equals(other.getIsdelete()))
            && (this.getPoliceId() == null ? other.getPoliceId() == null : this.getPoliceId().equals(other.getPoliceId()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_f_message
     *
     * @mbggenerated
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getTitle() == null) ? 0 : getTitle().hashCode());
        result = prime * result + ((getContent() == null) ? 0 : getContent().hashCode());
        result = prime * result + ((getPoliceName() == null) ? 0 : getPoliceName().hashCode());
        result = prime * result + ((getParentId() == null) ? 0 : getParentId().hashCode());
        result = prime * result + ((getRootId() == null) ? 0 : getRootId().hashCode());
        result = prime * result + ((getVisitCount() == null) ? 0 : getVisitCount().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getIsdelete() == null) ? 0 : getIsdelete().hashCode());
        result = prime * result + ((getPoliceId() == null) ? 0 : getPoliceId().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        return result;
    }
}