package cn.com.realer.pojo;

import cn.com.realer.core.generator.base.BaseModel;

@SuppressWarnings("serial")
public class GabMBlock extends BaseModel {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_m_block.name_
     *
     * @mbggenerated
     */
    private String name;


    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_m_block.model_id
     *
     * @mbggenerated
     */
    private Integer modelId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_m_block.order_id
     *
     * @mbggenerated
     */
    private Integer orderId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gab_m_block.icon
     *
     * @mbggenerated
     */
    private String icon;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_m_block.name_
     *
     * @return the value of gab_m_block.name_
     *
     * @mbggenerated
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_m_block.name_
     *
     * @param name the value for gab_m_block.name_
     *
     * @mbggenerated
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

  

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_m_block.model_id
     *
     * @return the value of gab_m_block.model_id
     *
     * @mbggenerated
     */
    public Integer getModelId() {
        return modelId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_m_block.model_id
     *
     * @param modelId the value for gab_m_block.model_id
     *
     * @mbggenerated
     */
    public void setModelId(Integer modelId) {
        this.modelId = modelId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_m_block.order_id
     *
     * @return the value of gab_m_block.order_id
     *
     * @mbggenerated
     */
    public Integer getOrderId() {
        return orderId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_m_block.order_id
     *
     * @param orderId the value for gab_m_block.order_id
     *
     * @mbggenerated
     */
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gab_m_block.icon
     *
     * @return the value of gab_m_block.icon
     *
     * @mbggenerated
     */
    public String getIcon() {
        return icon;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gab_m_block.icon
     *
     * @param icon the value for gab_m_block.icon
     *
     * @mbggenerated
     */
    public void setIcon(String icon) {
        this.icon = icon == null ? null : icon.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_block
     *
     * @mbggenerated
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", name=").append(name);
        sb.append(", modelId=").append(modelId);
        sb.append(", orderId=").append(orderId);
        sb.append(", icon=").append(icon);
        sb.append("]");
        return sb.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_block
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
        GabMBlock other = (GabMBlock) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getIsdelete() == null ? other.getIsdelete() == null : this.getIsdelete().equals(other.getIsdelete()))
            && (this.getModelId() == null ? other.getModelId() == null : this.getModelId().equals(other.getModelId()))
            && (this.getOrderId() == null ? other.getOrderId() == null : this.getOrderId().equals(other.getOrderId()))
            && (this.getIcon() == null ? other.getIcon() == null : this.getIcon().equals(other.getIcon()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_block
     *
     * @mbggenerated
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getIsdelete() == null) ? 0 : getIsdelete().hashCode());
        result = prime * result + ((getModelId() == null) ? 0 : getModelId().hashCode());
        result = prime * result + ((getOrderId() == null) ? 0 : getOrderId().hashCode());
        result = prime * result + ((getIcon() == null) ? 0 : getIcon().hashCode());
        return result;
    }
}