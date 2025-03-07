package modules;

import static org.openqa.selenium.remote.BrowserType.*;
import static supports.CommonFunction.*;

public class LoginAutonomous {

    public static void main(String[] args) throws InterruptedException {
        openBrowser(CHROME);
        visit("https://www.autonomous.ai/");
        visit("https://www.autonomous.ai/otp?login_source=topbar&next_url=%2F&token=d02e1b42-538d-4472-81a4-76d6d7f23e39");
        Thread.sleep(10000);
        quit();

    }
}
