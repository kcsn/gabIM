package cn.com.realer.dao.generator.u;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.pojo.GabURole;
import java.util.List;

public interface GabURoleMapper extends BaseMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_u_role
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_u_role
     *
     * @mbggenerated
     */
    int insert(GabURole record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_u_role
     *
     * @mbggenerated
     */
    GabURole selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_u_role
     *
     * @mbggenerated
     */
    List<GabURole> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gab_u_role
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(GabURole record);
}