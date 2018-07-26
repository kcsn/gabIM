/**
 * 
 */
package cn.com.realer.core.support;

import cn.com.realer.core.Constants;
import cn.com.realer.core.support.exception.BusinessException;
import cn.com.realer.core.support.exception.LoginException;
import cn.com.realer.core.util.WebUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

/**
 * 控制器基类
 * 
 * @author ShenHuaJie
 * @version 2016年5月20日 下午3:47:58
 */
public abstract class BaseController {
	protected final Logger logger = LogManager.getLogger(this.getClass());

	/** 获取当前用户Id */
	protected Integer getCurrUser() {
		return WebUtil.getCurrentUser();
	}

	/** 设置成功响应代码 */
	protected ResponseEntity<ModelMap> setSuccessModelMap(ModelMap modelMap) {
		return setSuccessModelMap(modelMap, null);
	}

	/** 设置成功响应代码 */
	protected ResponseEntity<ModelMap> setSuccessModelMap(ModelMap modelMap, Object data) {
		return setModelMap(modelMap, HttpCode.OK, data);
	}

	/** 设置响应代码 */
	protected ResponseEntity<ModelMap> setModelMap(ModelMap modelMap, HttpCode code) {
		return setModelMap(modelMap, code, null);
	}

	/** 设置响应代码 */
	protected ResponseEntity<ModelMap> setModelMap(ModelMap modelMap, HttpCode code, Object data) {
		modelMap.remove("void");
		if (data != null) {
			modelMap.put("data", data);
		}
		modelMap.put("httpCode", code.value());
		modelMap.put("msg", code.msg());
		modelMap.put("timestamp", System.currentTimeMillis());
		return ResponseEntity.ok(modelMap);
	}
	
	
	
	/** 设置响应代码 */
	protected ResponseEntity<Map<String, Object>> setMap(HttpCode code, Object data) {
		Map<String, Object> map=new HashMap<String, Object>();
		if (data != null) {
			map.put("data", data);
		}
		map.put("httpCode", code.value());
		map.put("msg", code.msg());
		map.put("timestamp", System.currentTimeMillis());
		return ResponseEntity.ok(map);
	}


	/** 异常处理 */
	@ExceptionHandler(RuntimeException.class)
	public void exceptionHandler(HttpServletResponse response, Exception ex) throws Exception {
		logger.error(Constants.Exception_Head, ex);
		ModelMap modelMap = new ModelMap();
		if (ex instanceof IllegalArgumentException) {
			if (StringUtils.isNotBlank(ex.getMessage())) {
				modelMap.put("httpCode", HttpCode.BAD_REQUEST.value());
				modelMap.put("msg", ex.getMessage());
			} else {
				setModelMap(modelMap, HttpCode.BAD_REQUEST);
			}
		} else if (ex instanceof LoginException) {
			if (StringUtils.isNotBlank(ex.getMessage())) {
				modelMap.put("httpCode", HttpCode.LOGIN_FAIL.value());
				modelMap.put("msg", ex.getMessage());
			} else {
				setModelMap(modelMap, HttpCode.LOGIN_FAIL);
			}
		} else if (ex instanceof BusinessException) {
			if (StringUtils.isNotBlank(ex.getMessage())) {
				modelMap.put("httpCode", HttpCode.CONFLICT.value());
				modelMap.put("msg", ex.getMessage());
			} else {
				setModelMap(modelMap, HttpCode.CONFLICT);
			}
		}else {
			setModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
		}
		response.setContentType("application/json;charset=UTF-8");
		byte[] bytes = JSON.toJSONBytes(modelMap, SerializerFeature.DisableCircularReferenceDetect);
		response.getOutputStream().write(bytes);
	}
}
