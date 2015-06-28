package consumer;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.beans.factory.annotation.*;

@Controller
@SpringBootApplication
public class Entry {
    public static void main(String[] args) throws Exception {
	SpringApplication.run(Entry.class, args);
    }
}
