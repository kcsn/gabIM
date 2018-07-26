package cn.com.realer.pojo.vo;

import cn.com.realer.core.generator.base.BaseModel;
import java.util.Date;

@SuppressWarnings("serial")
public class GabUPoliceThemeVo extends BaseModel {
	/*填报id*/    
    private Integer policeId;
    /*填报单位(派出所)*/   
    private String policeName;
    /*模板id*/
    private Integer modelId;
    /*主题id*/
    private Integer themeId;
    /*主题名称*/
    private String themeName;
    /*审核状态*/
    private Short status;
    /*    审核人*/
    private String auditor;
    /*审核时间*/
    private Date auditTime;
    /*审核意见*/
    private String auditDesc;
    
    
	public Integer getPoliceId() {
		return policeId;
	}
	public void setPoliceId(Integer policeId) {
		this.policeId = policeId;
	}
	public String getPoliceName() {
		return policeName;
	}
	public void setPoliceName(String policeName) {
		this.policeName = policeName;
	}
	public Integer getModelId() {
		return modelId;
	}
	public void setModelId(Integer modelId) {
		this.modelId = modelId;
	}
	public Integer getThemeId() {
		return themeId;
	}
	public void setThemeId(Integer themeId) {
		this.themeId = themeId;
	}
	public String getThemeName() {
		return themeName;
	}
	public void setThemeName(String themeName) {
		this.themeName = themeName;
	}
	public Short getStatus() {
		return status;
	}
	public void setStatus(Short status) {
		this.status = status;
	}
	public String getAuditor() {
		return auditor;
	}
	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}
	public Date getAuditTime() {
		return auditTime;
	}
	public void setAuditTime(Date auditTime) {
		this.auditTime = auditTime;
	}
	public String getAuditDesc() {
		return auditDesc;
	}
	public void setAuditDesc(String auditDesc) {
		this.auditDesc = auditDesc;
	}
    
    
	
   
}