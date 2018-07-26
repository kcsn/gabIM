package cn.com.realer.shiro;

import cn.com.realer.core.util.WebUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;



public class Realm extends AuthorizingRealm {
	private final Logger logger = LogManager.getLogger();
//	@Autowired
//	private SysUserService sysUserService;
//
//	@Autowired
//	private SysAuthorityService sysAuthService;

	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		Integer userId = WebUtil.getCurrentUser();
//		SysUser user = sysUserService.getUserById(userId,merchantId,1);
//
//		Map<String,Object> params= SqlUtils.getQueryBaseMap(merchantId,1);
//		params.put("userId",user.getId());
//		List<SysAuthority> list = sysAuthService.getAuthByUserId(params);
//		for (SysAuthority auth : list) {
//			if (StringUtils.isNotBlank(auth.getAuthCode()+"")) {
//				// 添加基于Permission的权限信息
//				info.addStringPermission(auth.getAuthCode()+"");
//			}
//		}
		// 添加用户权限
		info.addStringPermission("user");
		return info;

	}

	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken)
			throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		Long merchantId=WebUtil.getCurrentMerchantId();
//		SysUser user = sysUserService.getUser(token.getUsername(),merchantId);
//		if (user != null) {
//			StringBuilder sb = new StringBuilder(100);
//			for (int i = 0; i < token.getPassword().length; i++) {
//				sb.append(token.getPassword()[i]);
//			}
//			if (user.getLoginPassword().equals(sb.toString())) {
//				WebUtil.saveCurrentUser(user.getId());
//				AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(user.getLoginName(),
//						user.getLoginPassword(), user.getUserName());
//				return authcInfo;
//			}
//			logger.warn("USER [{}] PASSWORD IS WRONG: {}", token.getUsername(), sb.toString());
			return null;
//		} else {
//			logger.warn("No user: {}", token.getUsername());
//			return null;
//		}de
	}



	/*private void saveSession(String account) {
		SysSession record = new SysSession();
		record.setAccount(account);
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		record.setSessionId(session.getId().toString());
		String host = (String) session.getAttribute("HOST");
		record.setIp(StringUtils.isBlank(host) ? session.getHost() : host);
		record.setStartTime(session.getStartTimestamp());
		sysSessionService.update(record);
	}*/
}
