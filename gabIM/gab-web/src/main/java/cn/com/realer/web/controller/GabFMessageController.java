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
import cn.com.realer.pojo.GabUPermission;
import cn.com.realer.pojo.vo.MessageVo;
import cn.com.realer.service.GabFMessageService;
import cn.com.realer.service.GabMItemService;
import cn.com.realer.web.WebController;

@RestController
@RequestMapping("api/message")
public class GabFMessageController extends WebController{

	@Autowired
	private GabFMessageService gabFMessageService;

	/**
	 * 查询所有message
	 * @param modelMap
	 * @param request
	 * @param parentId
	 * @param policeId
	 * @return
	 */
	@ApiOperation(value = "查询所有message", httpMethod = "POST", notes = "查询所有message成功")
	@RequestMapping("select-message")
	@ResponseBody
	public Object selectMessage(ModelMap modelMap,
			@RequestParam(value = "parentId", required = false) Integer parentId,
			@RequestParam(value = "policeId", required = false) Integer policeId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("parentId", parentId);
			params.put("policeId", policeId);
			List<GabFMessage> messageList = gabFMessageService.selectList(params);
			//return setSuccessModelMap(modelMap,messageList );
			return setMap( HttpCode.OK, messageList);
		} catch (Exception e) {
			e.printStackTrace();
			//return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
			return setMap( HttpCode.INTERNAL_SERVER_ERROR, null);
		}

	}
	/**
	 * 问题留言板-全部
	 */
	@ApiOperation(value = "问题留言板-全部", httpMethod = "GET", notes = "问题留言板-全部")
	@RequestMapping("select-all-message")
	@ResponseBody
	public Object selectAllMessage(ModelMap modelMap) {
		try {
			List<MessageVo> list = gabFMessageService.selectAllMessage();
			
			return setMap( HttpCode.OK, list);
		} catch (Exception e) {
			e.printStackTrace();
			//return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
			return setMap( HttpCode.INTERNAL_SERVER_ERROR, null);
		}
		
	}
	
	/**
	 * 添加留言
	 */
	@ApiOperation(value = "添加留言", httpMethod = "GET", notes = "添加留言")
	@RequestMapping("add-message")
	public Object addTheme(GabFMessage message, ModelMap modelMap) {
		try {
			//添加留言,初始化,
			message.setRootId(0);
			message.setVisitCount(0);
			gabFMessageService.add(message);
			//判断是否是父留言
			if (message.getParentId()==0) {	//是父留言
				message.setRootId(message.getId());
			}else {	//不是父留言
				message.setRootId(message.getParentId());
			}
			gabFMessageService.update(message);
			return setMap(HttpCode.OK, message);
			
		} catch (Exception e) {
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}
}
