package cn.com.realer.config;

import com.google.common.base.Predicate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

/**
 * Created by zhl on 16-6-12.
 */
@Configuration
@EnableWebMvc //NOTE: Only needed in a non-springboot application
@EnableSwagger2 //Enable swagger 2.0 spec
@ComponentScan("cn.com.realer.web")
public class SwaggerConfig {

    @Bean
    public Docket platformApi() {
        return new Docket(DocumentationType.SWAGGER_2)
//                .host("127.0.0.1:8080")
                .groupName("full-platform")
                .apiInfo(apiInfo())
                .forCodeGeneration(true)
                .select()
                .paths(platformStorePaths())
                .build();
    }

    private Predicate<String> platformStorePaths() {
        return or(
                regex("/api.*")
        );
    }



    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("gab管理系统")
                .description("Descriptions.")
                .termsOfServiceUrl("http://www.realer.com.cn")
                .contact("hailianglone@126.com")
                .license("Apache License Version 2.0")
                .licenseUrl("https://github.com/springfox/springfox/blob/master/LICENSE")
                .version("2.0")
                .build();
    }

}