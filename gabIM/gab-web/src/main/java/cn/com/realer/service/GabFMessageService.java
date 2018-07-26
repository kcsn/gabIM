package cn.com.realer.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.f.GabFMessageProvider;
import cn.com.realer.pojo.GabFMessage;
import cn.com.realer.pojo.vo.MessageVo;

@Service
public class GabFMessageService extends BaseService<GabFMessageProvider, GabFMessage>{

	@Autowired
	private GabFMessageProvider gabFMessageProvider;
	
	public List<GabFMessage> selectList(Map<String,Object> params){
		return gabFMessageProvider.selectList(params);
	}
	
	
	public List<MessageVo> selectAllMessage() {
		List<MessageVo> messageVos = new ArrayList<>();
		List<GabFMessage> messages = selectList(null);
		   for (GabFMessage gabFMessage : messages) {
		    	if(gabFMessage.getParentId()==0) {
		    		MessageVo messageVo = new MessageVo();
		    		messageVo.setRootId(gabFMessage.getRootId());
		    		messageVo.setTitle(gabFMessage.getTitle());
		    		messageVo.setContent(gabFMessage.getContent());
		    		messageVo.setPoliceName(gabFMessage.getPoliceName());
		    		messageVo.setCreateTime(gabFMessage.getCreateTime());
		    		messageVo.setVisitCount(gabFMessage.getVisitCount());
		    		messageVos.add(messageVo);
		    	}
			}	
	    
	    	 for (MessageVo messageVo : messageVos) {
	    		 List<MessageVo> mesList = new ArrayList<>();
	    		 for (GabFMessage gabFMessage : messages) {
					if(gabFMessage.getParentId()!=0 && gabFMessage.getRootId()== messageVo.getRootId()) {
					   MessageVo mes = new MessageVo();
					   mes.setPoliceName(gabFMessage.getPoliceName());
					   mes.setContent(gabFMessage.getContent());
					   mesList.add(mes);
					   }
				}
	    		 messageVo.setMesList(mesList);
	    		 messageVo.setCount(mesList.size());
	    	 }
		return messageVos;
	}
	
	
}
