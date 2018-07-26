package cn.com.realer.core.generator.plugin;

import org.mybatis.generator.api.*;
import org.mybatis.generator.api.dom.java.CompilationUnit;
import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
import org.mybatis.generator.api.dom.java.Interface;
import org.mybatis.generator.api.dom.java.JavaVisibility;
import org.mybatis.generator.api.dom.xml.Attribute;
import org.mybatis.generator.api.dom.xml.Document;
import org.mybatis.generator.api.dom.xml.XmlElement;
import org.mybatis.generator.exception.ShellException;
import org.mybatis.generator.internal.DefaultShellCallback;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import static org.mybatis.generator.internal.util.StringUtility.stringHasValue;

/**
 * 生成 Mapper 类
 * 
 * @author ShenHuaJie
 * @version 2016年6月24日 下午6:47:06
 */
public class MapperPlugin extends PluginAdapter {

	private static final String DEFAULT_DAO_SUPER_CLASS = "cn.com.realer.core.generator.base.BaseMapper";
	private static final String DEFAULT_EXPAND_DAO_SUPER_CLASS = "cn.com.realer.core.support.spring.data.redis.BaseExpandMapper";
	private String daoTargetDir;
	private String daoTargetPackage;

	private String daoSuperClass;

	// 扩展
	private String expandDaoTargetPackage;
	private String expandDaoSuperClass;

	// provider
	private String providerTargetProject;
	private String providerTargetPackage;
	private String providerImplTargetPackage;
	private String providerSuperClass;
	private String providerImplSuperClass;

	private ShellCallback shellCallback = null;

	public MapperPlugin() {
		shellCallback = new DefaultShellCallback(false);
	}

	public boolean validate(List<String> warnings) {
		daoTargetDir = properties.getProperty("targetProject");
		boolean valid = stringHasValue(daoTargetDir);

		daoTargetPackage = properties.getProperty("targetPackage");
		boolean valid2 = stringHasValue(daoTargetPackage);

		daoSuperClass = properties.getProperty("daoSuperClass");
		if (!stringHasValue(daoSuperClass)) {
			daoSuperClass = DEFAULT_DAO_SUPER_CLASS;
		}

		expandDaoTargetPackage = properties.getProperty("expandTargetPackage");
		expandDaoSuperClass = properties.getProperty("expandDaoSuperClass");


		providerTargetProject = properties.getProperty("providerTargetProject");
		providerTargetPackage = properties.getProperty("providerTargetPackage");
		providerImplTargetPackage = properties.getProperty("providerImplTargetPackage");
		providerSuperClass = properties.getProperty("providerSuperClass");
		providerImplSuperClass = properties.getProperty("providerImplSuperClass");

		if (!stringHasValue(expandDaoSuperClass)) {
			expandDaoSuperClass = DEFAULT_EXPAND_DAO_SUPER_CLASS;
		}
		return valid && valid2;
	}

	public List<GeneratedJavaFile> contextGenerateAdditionalJavaFiles(IntrospectedTable introspectedTable) {
		JavaFormatter javaFormatter = context.getJavaFormatter();
		List<GeneratedJavaFile> mapperJavaFiles = new ArrayList<GeneratedJavaFile>();
		for (GeneratedJavaFile javaFile : introspectedTable.getGeneratedJavaFiles()) {
			CompilationUnit unit = javaFile.getCompilationUnit();
			FullyQualifiedJavaType baseModelJavaType = unit.getType();

			String shortName = baseModelJavaType.getShortName();

			GeneratedJavaFile mapperJavafile = null;
			if (shortName.endsWith("Mapper")) { // 扩展Mapper
				if (stringHasValue(expandDaoTargetPackage)) {

					//update by liwei  expandMapper泛型添加++
					String beanClassName=shortName.replace("Mapper", "");
					//--

					Interface mapperInterface = new Interface(
							expandDaoTargetPackage + "." + shortName.replace("Mapper", "ExpandMapper"));
					mapperInterface.setVisibility(JavaVisibility.PUBLIC);
					mapperInterface.addJavaDocLine("/**");
					mapperInterface.addJavaDocLine(" * " + shortName + "扩展");
					mapperInterface.addJavaDocLine(" */");

					FullyQualifiedJavaType daoSuperType = new FullyQualifiedJavaType(expandDaoSuperClass);

					//update by liwei  expandMapper泛型添加++
					FullyQualifiedJavaType beanType=null;
					try{
						for(FullyQualifiedJavaType type:unit.getImportedTypes()){
							if(type.getShortName().endsWith(beanClassName)){
								beanType=type;
								break;
							}
						}
					}catch (Exception e){
						e.printStackTrace();
					}
					if(beanType!=null){
						daoSuperType.addTypeArgument(beanType);
						mapperInterface.addImportedType(beanType);
					}
					//--
					mapperInterface.addImportedType(daoSuperType);
					mapperInterface.addSuperInterface(daoSuperType);

					mapperJavafile = new GeneratedJavaFile(mapperInterface, daoTargetDir, javaFormatter);
					try {
						File mapperDir = shellCallback.getDirectory(daoTargetDir, expandDaoTargetPackage);
//						File mapperDir = shellCallback.getDirectory(daoTargetDir, daoTargetPackage);
						File mapperFile = new File(mapperDir, mapperJavafile.getFileName());
						// 文件不存在
						if (!mapperFile.exists()) {
							mapperJavaFiles.add(mapperJavafile);
						}
					} catch (ShellException e) {
						e.printStackTrace();
					}


					//添加provider
					if(stringHasValue(providerTargetPackage)&&stringHasValue(providerSuperClass)&&stringHasValue(providerImplSuperClass)&&stringHasValue(providerTargetProject)&&stringHasValue(providerImplTargetPackage)){
						Interface providerInterface = new Interface(
								providerTargetPackage + "." + shortName.replace("Mapper", "Provider"));
						providerInterface.setVisibility(JavaVisibility.PUBLIC);
						providerInterface.addJavaDocLine("/**");
						providerInterface.addJavaDocLine(" * " + shortName + " Provider");
						providerInterface.addJavaDocLine(" */");

						FullyQualifiedJavaType providerSuperType = new FullyQualifiedJavaType(providerSuperClass);
						providerSuperType.addTypeArgument(beanType);
						providerInterface.addImportedType(beanType);
						providerInterface.addImportedType(providerSuperType);
						providerInterface.addSuperInterface(providerSuperType);

						GeneratedJavaFile providerJavafile = new GeneratedJavaFile(providerInterface, providerTargetProject, javaFormatter);
						try {
							File mapperDir = shellCallback.getDirectory(providerTargetProject, providerTargetPackage);
							shellCallback.getDirectory(daoTargetDir, providerImplTargetPackage);
							File mapperFile = new File(mapperDir, providerJavafile.getFileName());
							// 文件不存在
							if (!mapperFile.exists()) {
								mapperJavaFiles.add(providerJavafile);
							}
						} catch (ShellException e) {
							e.printStackTrace();
						}
					}

				}
			} else if (!shortName.endsWith("Example")) { // CRUD Mapper
//				Interface mapperInterface = new Interface(daoTargetPackage + "." + shortName + "Mapper");
//
//				mapperInterface.setVisibility(JavaVisibility.PUBLIC);
//				mapperInterface.addJavaDocLine("/**");
//				mapperInterface.addJavaDocLine(" * 由MyBatis Generator工具自动生成，请不要手动修改");
//				mapperInterface.addJavaDocLine(" */");
//
//				FullyQualifiedJavaType daoSuperType = new FullyQualifiedJavaType(daoSuperClass);
//				// 添加泛型支持
//				daoSuperType.addTypeArgument(baseModelJavaType);
//				mapperInterface.addImportedType(baseModelJavaType);
//				mapperInterface.addImportedType(daoSuperType);
//				mapperInterface.addSuperInterface(daoSuperType);
//
//				mapperJavafile = new GeneratedJavaFile(mapperInterface, daoTargetDir, javaFormatter);
//				mapperJavaFiles.add(mapperJavafile);
			}
		}
		return mapperJavaFiles;
	}

	@Override
	public List<GeneratedXmlFile> contextGenerateAdditionalXmlFiles(IntrospectedTable introspectedTable) {
		XmlFormatter xmlFormatter=context.getXmlFormatter();
		List<GeneratedXmlFile> mapperXmlFiles=new ArrayList<>();
		List<GeneratedXmlFile> xmls=introspectedTable.getGeneratedXmlFiles();
		for(GeneratedXmlFile xmlFile:xmls){
			String fileName=xmlFile.getFileName();
			Document document = new Document("-//mybatis.org//DTD Mapper 3.0//EN","http://mybatis.org/dtd/mybatis-3-mapper.dtd");
			XmlElement el=new XmlElement("mapper");
			String content=xmlFile.getFormattedContent();
			content=content.substring(content.indexOf("<mapper namespace=\"")+19);
			content=content.substring(0,content.indexOf("\" >"));
			content=content.replace("generator","expand");
			content=content.replace("Mapper","ExpandMapper");
			el.addAttribute(new Attribute("namespace",content));
			document.setRootElement(el);
			GeneratedXmlFile mapperXmlFile=new GeneratedXmlFile(document,fileName.replace("Mapper","ExpandMapper"),xmlFile.getTargetPackage().replace("generator","expand"),xmlFile.getTargetProject(),xmlFile.isMergeable(),xmlFormatter);
			try {
				File mapperDir = shellCallback.getDirectory(xmlFile.getTargetProject(), xmlFile.getTargetPackage().replace("generator","expand"));
				File mapperFile = new File(mapperDir, mapperXmlFile.getFileName());
				// 文件不存在
				if (!mapperFile.exists()) {
					mapperXmlFiles.add(mapperXmlFile);
				}
				System.out.println(mapperFile.getAbsolutePath());
			}catch (ShellException e) {
				e.printStackTrace();
			}



		}

//		cn.com.realer.dao.expand.system.SysAuthorityExpandMapper


		return mapperXmlFiles;
	}
}
