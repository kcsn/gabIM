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
import cn.com.realer.core.util.WebUtil;
import cn.com.realer.pojo.GabFMessage;
import cn.com.realer.pojo.GabMBlockStatus;
import cn.com.realer.service.GabMBlockStatusService;
import cn.com.realer.web.WebController;

@RestController
@RequestMapping("api/blockStatus")
public class GabMBlockStatusController extends WebController {

	@Autowired
	private GabMBlockStatusService gabMBlockStatusService;

	/**
	 * 查询所有block下的status
	 * @param modelMap
	 * @param request
	 * @param policeId
	 * @return
	 */
	@ApiOperation(value = "查询所有block下的status", httpMethod = "POST", notes = "查询所有block下的status成功")
	@RequestMapping("select-block")
	@ResponseBody
	public Object selectBlockStatus(ModelMap modelMap, HttpServletRequest request,
			@RequestParam(value = "policeId", required = false) Integer policeId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("policeId", policeId);
			List<GabMBlockStatus> blockStatustList = gabMBlockStatusService
					.selectList(params);
			return setSuccessModelMap(modelMap, blockStatustList);
		} catch (Exception e) {
			e.printStackTrace();
			return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
		}

	}
	
	@ApiOperation(value = "初始化块状态", httpMethod = "POST", notes = "初始化块状态")
	@RequestMapping("block-init")
	@ResponseBody
	public Object blockInit(ModelMap modelMap, 
			@RequestParam(value = "themeId", required = true) Integer themeId,
			@RequestParam(value = "policeId", required = true) Integer policeId,
			@RequestParam(value = "blockId", required = true) Integer blockId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("themeId", themeId);
			params.put("policeId", policeId);
			params.put("blockId", blockId);
			List<GabMBlockStatus> list = gabMBlockStatusService.selectList(params);
			if(list.size()==0) {
			 GabMBlockStatus blockStatus = new GabMBlockStatus();
			 blockStatus.setBlockId(blockId);
			 blockStatus.setPoliceId(policeId);
			 blockStatus.setThemeId(themeId);
			 blockStatus.setStatus((short)0);
			 gabMBlockStatusService.add(blockStatus);
			 return setMap(HttpCode.OK, blockStatus);
			}
			return setMap(HttpCode.OK,null);
		} catch (Exception e) {
			e.printStackTrace();
			return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@ApiOperation(value = "更新块状态", httpMethod = "POST", notes = "更新块状态")
	@RequestMapping("block-update")
	@ResponseBody
	public Object blockUpdate(ModelMap modelMap, 
			@RequestParam(value = "themeId", required = true) Integer themeId,
			@RequestParam(value = "policeId", required = true) Integer policeId,
			@RequestParam(value = "blockId", required = true) Integer blockId) {
		try {
			    Map<String, Object> params = new HashMap<>();
			    params.put("themeId", themeId);
			    params.put("policeId", policeId);
			    params.put("blockId", blockId);
			    List<GabMBlockStatus> list = gabMBlockStatusService.selectList(params);
				GabMBlockStatus blockStatus = new GabMBlockStatus();
				blockStatus.setId(list.get(0).getId());
				blockStatus.setCreateTime(list.get(0).getCreateTime());
				blockStatus.setBlockId(blockId);
				blockStatus.setPoliceId(policeId);
				blockStatus.setThemeId(themeId);
				blockStatus.setStatus((short)1);
				gabMBlockStatusService.update(blockStatus);
				return setMap(HttpCode.OK, blockStatus);
		} catch (Exception e) {
			e.printStackTrace();
			return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@ApiOperation(value = "添加所有status", httpMethod = "POST", notes = "添加所有status")
	@RequestMapping("add-status")
	public Object addTheme(GabMBlockStatus gabMBlockStatus, ModelMap modelMap) {
		try {
			gabMBlockStatusService.addAllBlockStatus(gabMBlockStatus);
			return setMap(HttpCode.OK, 1);
		} catch (Exception e) {
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}
	
	
}
