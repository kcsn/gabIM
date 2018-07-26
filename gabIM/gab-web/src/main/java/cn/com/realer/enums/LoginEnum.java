package cn.com.realer.enums;

/**
 *  登录时可能会出现的 枚举类
 */
public enum LoginEnum {
	STOP_USER(5,"已禁用"),
	NO_ACTIVE(4,"未激活"),
    NO_USER(3,"用户不存在"),
    ERROR_PASSWORD(-1,"密码错误"),
    USER_NO_LOGIN(-2,"用户未登录"),
    LOGIN_SUCCESS(1,"登录成功"),
    ;

    private int status;

    private String msg;

    LoginEnum(int status, String msg) {
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
