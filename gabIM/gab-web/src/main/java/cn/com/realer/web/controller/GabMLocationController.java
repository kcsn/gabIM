package cn.com.realer.web.controller;

import io.swagger.annotations.ApiOperation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.com.realer.core.support.HttpCode;
import cn.com.realer.pojo.GabMLocation;
import cn.com.realer.service.GabMLocationService;
import cn.com.realer.web.WebController;

@RestController
@RequestMapping("api/location")
public class GabMLocationController extends WebController{

	@Autowired
	private GabMLocationService gabMLocationService;

	@ApiOperation(value = "查询所有location", httpMethod = "POST", notes = "查询所有location成功")
	@RequestMapping("select-location")
	@ResponseBody
	public Object selectLocation(ModelMap modelMap, HttpServletRequest request,
			@RequestParam(value = "parentId", required = false) Integer parentId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("parentId", parentId);
			List<GabMLocation> locationList = gabMLocationService.selectList(params);
			return setSuccessModelMap(modelMap,locationList );
		} catch (Exception e) {
			e.printStackTrace();
			return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
		}

	}
}
