package cn.com.realer.core.em;

/**
 * Created by huren on 2017/5/11.
 */
public enum FrameResponseCode {
    /*后台服务响应  1000+   */
    NEED_LOGIN("1000","没有登录"),
    NEED_AUTH("1001","没有权限"),
    OPERATION_FAIL("1111","业务操作失败"),

    /*业务响应      6000+   */
    NO_SERVICE("6000","不支持该业务");
    private String code;
    private String display;

    FrameResponseCode(String code, String display) {
        this.code = code;
        this.display = display;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }
}
