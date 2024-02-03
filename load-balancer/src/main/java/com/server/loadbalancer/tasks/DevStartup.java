package com.server.loadbalancer.tasks;

import com.server.loadbalancer.model.UserEntity;
import com.server.loadbalancer.model.UserRole;
import com.server.loadbalancer.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Profile("bootstrap")
public class DevStartup implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger log = LoggerFactory.getLogger(DevStartup.class);

    @Autowired
    public DevStartup(UserRepository userRepository, PasswordEncoder passwordEncoder){

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("run dev Start Up Task");
        UserEntity admin = new UserEntity();
        admin.setFirstName("admin");
        admin.setLastName("admin");
        admin.setEmail("admin@gmail.com");
        admin.setPhone("+123456789");
        admin.setPassword(passwordEncoder.encode("password"));
        admin.setCreatedAt(LocalDateTime.now());
        admin.setModifiedAt(LocalDateTime.now());
        admin.setRole(UserRole.ADMIN);
        admin.setActive(true);
        userRepository.save(admin);
        log.info(admin.toString());
    }
}
