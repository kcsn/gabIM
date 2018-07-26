package cn.com.realer.core.exception;

/**
 * Created by haili on 2017/4/8.
 */
public class ExceptionInfo {


    /**
     * 错误信息打印
     * @param prefix
     * @param errorType
     * @param errorInfo
     * @return
     */
    public static String printfException(String prefix, String errorType, String errorInfo){
        StringBuilder sb = new StringBuilder();
        sb.append(prefix);
        sb.append(":");
        sb.append(errorType);
        sb.append(":");
        sb.append(errorInfo);
        return sb.toString();
    }
}
