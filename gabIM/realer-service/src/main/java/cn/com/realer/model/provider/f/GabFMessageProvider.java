package cn.com.realer.model.provider.f;



import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabFMessage;
import cn.com.realer.pojo.GabMBlock;

/**
 * GabFMessageMapper Provider
 */
public interface GabFMessageProvider extends BaseProvider<GabFMessage> {
	
	List<GabFMessage> selectList(Map<String,Object> params);
}