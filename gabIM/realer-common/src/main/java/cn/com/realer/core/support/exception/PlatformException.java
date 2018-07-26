package cn.com.realer.core.support.exception;

/**
 * Created by zhl on 16-6-7.
 */
public class PlatformException extends RuntimeException {
    private String msg;
    public PlatformException(String message) {
        this.msg = message;
    }


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
