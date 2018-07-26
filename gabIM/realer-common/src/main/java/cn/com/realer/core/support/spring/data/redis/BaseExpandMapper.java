package cn.com.realer.core.support.spring.data.redis;


import cn.com.realer.core.generator.base.BaseModel;
import com.github.pagehelper.Page;

import java.util.List;
import java.util.Map;

public interface BaseExpandMapper<T extends BaseModel> {
	/** 条件分页查询 */
	Page<Long> query(Map<String, Object> params);

	void updateBatch(List<T> list);
}