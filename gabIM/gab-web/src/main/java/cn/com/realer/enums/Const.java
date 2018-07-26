package cn.com.realer.enums;

/**
 * 常量类
 */
public class Const {

    public static final String CURRENT_USER="current_user";

    public static final String EMAIL="email";

    public static final String USERNAME="name";

    public interface Role{
        int ROLE_CUSTOMER = 0;
        int ROLE_ADMIN=1;
    }
}
