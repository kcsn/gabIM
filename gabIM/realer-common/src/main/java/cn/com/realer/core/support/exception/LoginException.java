package cn.com.realer.core.support.exception;

@SuppressWarnings("serial")
public class LoginException extends RuntimeException {
	public LoginException(String message) {
		super(message);
	}

	public LoginException(String message, Exception e) {
		super(message, e);
	}
}
