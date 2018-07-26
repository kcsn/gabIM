package cn.com.realer.web.utils;

import cn.com.realer.core.exception.FrameException;
import com.alibaba.druid.util.StringUtils;
import org.apache.commons.io.output.FileWriterWithEncoding;

import java.io.*;

/**
 * Created by huren on 2017/6/16.
 */
public class FileUtils {
    public static String SYS_LOCAL_FILE_ENCODING="UTF-8";
    //文件上传到本地

    //获取文件上传路径

    //文件上传
    public static File saveContentToLocalFile(String fileName, String content,String encoding){
        return saveContentToLocalFile(new File(fileName),content,encoding);
    }

    public static File saveContentToLocalFile(File file, String content,String encoding){
        if(StringUtils.isEmpty(encoding)){
            encoding="UTF-8";
        }
        checkFileDir(file);
        FileWriterWithEncoding fw = null;
        BufferedWriter writer = null;
        try {
            fw = new FileWriterWithEncoding(file, encoding);
            writer = new BufferedWriter(fw);
            writer.write(content);
            writer.flush();
        }catch (Exception e){
            throw new FrameException("文件保存失败:"+e.getMessage());
        }finally {
            try {
                writer.close();
                fw.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return file;
    }

    public static File saveFileToLocalFile(String fileName,InputStream source){
        return saveFileToLocalFile(new File(fileName),source);
    }

    public static File saveFileToLocalFile(File file,InputStream source){
        checkFileDir(file);
        OutputStream os=null;
        try {
            os=new FileOutputStream(file);
            byte[] bytes=new byte[2014];
            while (source.read(bytes) != -1) {// 将文件内容写到文件中
                os.write(bytes);
            }
            os.flush();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                source.close();// 输入流关闭
                os.close();// 输出流关闭
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return file;
    }


    public static void checkFileDir(File file){
        if(file.getParentFile()!=null&&!file.getParentFile().exists()){
            file.getParentFile().mkdirs();
        }
        if(!file.isFile()){
            throw new FrameException("文件路径不完整:"+file.getAbsolutePath());
        }
        if(!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
                throw new FrameException("文件创建失败:"+file.getAbsolutePath()+"  ;\n\r错误信息："+e.getMessage());
            }
        }
    }

}
