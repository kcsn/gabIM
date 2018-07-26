package cn.com.realer.core.exception;

/**
 * Created by wanglong on 2017/2/19.
 */
public class FrameException extends RuntimeException {
    private String code;
    private String display;



    public FrameException(String code, String message) {
        this.code = code;
        this.display = message;
    }

    public FrameException(String message) {
        this.code = "1111";
        this.display = message;
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
