package cn.com.realer.core.support.provider;

import com.github.pagehelper.PageInfo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * Created by zhl on 16-6-3.
 */
public interface BaseProvider<K> {
    @Transactional
    public K update(K record);

    @Transactional
    public void delete(Integer id, Integer userId);

    public K queryById(Integer id);

    public PageInfo<K> query(Map<String, Object> params);


}

