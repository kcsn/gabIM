package cn.com.realer.enums;

/**
 *  登录时可能会出现的 枚举类
 */
public enum ActiveEnum {
	
    ACTIVE_ERROR(-1,"激活失败,请重新注册"),
    ACTIVE_SUCCESS(1,"激活成功,登录"),
    ;

    private int status;

    private String msg;

    ActiveEnum(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public int getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }
}
