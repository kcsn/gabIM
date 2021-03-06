package cn.com.realer.pojo;

import cn.com.realer.core.generator.base.BaseModel;

@SuppressWarnings("serial")
public class GabMCategory extends BaseModel {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_m_category.parent_id
     *
     * @mbggenerated
     */
    private Integer parentId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_m_category.name_
     *
     * @mbggenerated
     */
    private String name;


    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_m_category.parent_id
     *
     * @return the value of gab_m_category.parent_id
     *
     * @mbggenerated
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_m_category.parent_id
     *
     * @param parentId the value for gab_m_category.parent_id
     *
     * @mbggenerated
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_m_category.name_
     *
     * @return the value of gab_m_category.name_
     *
     * @mbggenerated
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_m_category.name_
     *
     * @param name the value for gab_m_category.name_
     *
     * @mbggenerated
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

 

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_category
     *
     * @mbggenerated
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", parentId=").append(parentId);
        sb.append(", name=").append(name);
        sb.append("]");
        return sb.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_category
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
        GabMCategory other = (GabMCategory) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getParentId() == null ? other.getParentId() == null : this.getParentId().equals(other.getParentId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getIsdelete() == null ? other.getIsdelete() == null : this.getIsdelete().equals(other.getIsdelete()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_category
     *
     * @mbggenerated
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getParentId() == null) ? 0 : getParentId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getIsdelete() == null) ? 0 : getIsdelete().hashCode());
        return result;
    }
}