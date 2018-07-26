package cn.com.realer.core.support;

import cn.com.realer.core.Constants;
import cn.com.realer.core.generator.base.BaseModel;
import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.core.util.WebUtil;
import com.github.pagehelper.PageInfo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import java.util.Map;

public abstract class BaseService<P extends BaseProvider<T>, T extends BaseModel> {

	protected Logger logger = LogManager.getLogger();
	@Autowired
	protected P provider;

	/** 修改 */
	public void update(T record) {
//		record.setUpdateBy(WebUtil.getCurrentUser());
		Assert.notNull(record.getId(), "ID");
		provider.update(record);
	}

	/** 新增 */
	public void add(T record) {
//		record.setCreateBy(WebUtil.getCurrentUser());
//		record.setUpdateBy(WebUtil.getCurrentUser());
		provider.update(record);
	}

	/** 删除 */
	public void delete(Integer id) {
		Assert.notNull(id, "ID");
		provider.delete(id, WebUtil.getCurrentUser());
	}

	/** 根据Id查询 */
	@SuppressWarnings("unchecked")
	public T queryById(Integer id) {
		Assert.notNull(id, "ID");
		StringBuilder sb = new StringBuilder(Constants.CACHE_NAMESPACE);
		String className = this.getClass().getSimpleName().replace("Service", "");
		sb.append(className.substring(0, 1).toLowerCase()).append(className.substring(1));
		sb.append(":").append(id);
		T record = provider.queryById(id);
		return record;
	}

	/** 条件查询 */
	public PageInfo<T> query(Map<String, Object> params) {
		return provider.query(params);
	}
}
