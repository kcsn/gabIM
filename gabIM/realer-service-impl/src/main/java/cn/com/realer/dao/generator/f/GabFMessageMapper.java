package cn.com.realer.dao.generator.f;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.pojo.GabFMessage;
import java.util.List;

public interface GabFMessageMapper extends BaseMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_f_message
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_f_message
     *
     * @mbggenerated
     */
    int insert(GabFMessage record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_f_message
     *
     * @mbggenerated
     */
    GabFMessage selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_f_message
     *
     * @mbggenerated
     */
    List<GabFMessage> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_f_message
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(GabFMessage record);
}