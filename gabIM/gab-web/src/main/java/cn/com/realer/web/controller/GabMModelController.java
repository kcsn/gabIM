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
import cn.com.realer.pojo.GabFMessage;
import cn.com.realer.pojo.GabMItem;
import cn.com.realer.pojo.GabMModel;
import cn.com.realer.service.GabFMessageService;
import cn.com.realer.service.GabMItemService;
import cn.com.realer.service.GabMModelService;
import cn.com.realer.web.WebController;

@RestController
@RequestMapping("api/model")
public class GabMModelController extends WebController{

	@Autowired
	private GabMModelService gabMModelService;

	@ApiOperation(value = "查询所有model", httpMethod = "POST", notes = "查询所有model成功")
	@RequestMapping("select-model")
	@ResponseBody
	public Object selectModel(ModelMap modelMap, HttpServletRequest request) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			List<GabMModel> modeltList = gabMModelService.selectList(params);
			//return setSuccessModelMap(modelMap,messageList );
			return setMap( HttpCode.OK, modeltList);
		} catch (Exception e) {
			e.printStackTrace();
			//return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
			return setMap( HttpCode.INTERNAL_SERVER_ERROR, null);
		}

	}
}
