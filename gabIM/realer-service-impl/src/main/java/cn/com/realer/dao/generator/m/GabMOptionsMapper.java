package cn.com.realer.dao.generator.m;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.pojo.GabMOptions;
import java.util.List;

public interface GabMOptionsMapper extends BaseMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_options
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_options
     *
     * @mbggenerated
     */
    int insert(GabMOptions record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_options
     *
     * @mbggenerated
     */
    GabMOptions selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_options
     *
     * @mbggenerated
     */
    List<GabMOptions> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_m_options
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(GabMOptions record);
}