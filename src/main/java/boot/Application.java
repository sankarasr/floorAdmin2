package boot;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"boot"})
public class Application {


    private static final Logger log = LoggerFactory.getLogger(Application.class);
    /**
     * private constructor
     */
    Application(){

    }

    /**
     * main class
     * @param args
     */
    public static void main(String[] args) {

        final SpringApplication springApplication = new SpringApplicationBuilder()
                        .sources(Application.class)
                        .web(true)
                        .build();

        springApplication.run(args);

    }
}
