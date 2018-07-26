package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMBlockProvider;
import cn.com.realer.model.provider.m.GabMBlockStatusProvider;
import cn.com.realer.pojo.GabMBlock;
import cn.com.realer.pojo.GabMBlockStatus;

@Service
public class GabMBlockStatusService extends BaseService<GabMBlockStatusProvider, GabMBlockStatus>{
	
		@Autowired
		private GabMBlockProvider gabMBlockProvider;
	
		//查询某个的theme下的所有BlockStatus；	
		public List<GabMBlockStatus> selectList(Map<String,Object> params){
			return this.provider.selectList(params);

		}
		
		/**
		 * 添加blockStatus,并初始化状态为0
		 * @param gabMBlockStatus
		 */
		public void addAllBlockStatus(GabMBlockStatus gabMBlockStatus1) {
			
			//查询所有的block,并遍历得到blockId;
			List<GabMBlock> selectList = gabMBlockProvider.selectList(null);
			for (GabMBlock gabMBlock : selectList) {
				GabMBlockStatus gabMBlockStatus = new GabMBlockStatus();
				gabMBlockStatus.setPoliceId(gabMBlockStatus1.getPoliceId());
				gabMBlockStatus.setThemeId(gabMBlockStatus1.getThemeId());
				gabMBlockStatus.setBlockId(gabMBlock.getId());
				gabMBlockStatus.setStatus((short)0);
				this.add(gabMBlockStatus);
			}
			
		}
}
