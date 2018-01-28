package boot;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by sramasubramanian on 24/01/18.
 */
@Controller
public class FloorController {
    @RequestMapping("/")
    public String index() {
        return "index";
    }
	
	@RequestMapping("/promotionAnalysis")
    public String promotionAnalysis() {
        return "promotionAnalysis";
    }

}
