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
import cn.com.realer.pojo.GabMItem;
import cn.com.realer.pojo.GabMLocation;
import cn.com.realer.service.GabMItemService;
import cn.com.realer.service.GabMLocationService;
import cn.com.realer.web.WebController;

@RestController
@RequestMapping("api/item")
public class GabMItemController extends WebController{

	@Autowired
	private GabMItemService gabMItemService;

	@ApiOperation(value = "查询所有item", httpMethod = "POST", notes = "查询所有item成功")
	@RequestMapping("select-item")
	@ResponseBody
	public Object selectItems(ModelMap modelMap, HttpServletRequest request,
			@RequestParam(value = "parentId", required = false) Integer parentId,
			@RequestParam(value = "modelId", required = false) Integer modelId,
			@RequestParam(value = "blockId", required = false) Integer blockId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("parentId", parentId);
			params.put("modelId", modelId);
			params.put("blockId", blockId);
			List<GabMItem> itemList = gabMItemService.selectList(params);
			return setSuccessModelMap(modelMap,itemList );
		} catch (Exception e) {
			e.printStackTrace();
			return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
		}

	}
}
