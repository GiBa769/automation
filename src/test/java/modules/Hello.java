package modules;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Hello {
    public static void main(String[] args) {

        WebDriver driver = new ChromeDriver();
        driver.get("https://staging.autonomousdev.xyz/");
        driver.quit();
    }
}