package supports;

import io.github.bonigarcia.wdm.WebDriverManager;
import io.qameta.allure.Attachment;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.util.List;

import static org.openqa.selenium.remote.BrowserType.*;
import static org.openqa.selenium.remote.BrowserType.CHROME;

public class CommonFunction {
    private static WebDriver driver;
    private static WebDriverWait waiter;
    private static final int TIMEOUT = 5;

    public static void openBrowser(String browserName) throws InterruptedException {
        if (browserName.equals(IE)) {
            WebDriverManager.iedriver().setup();
            driver = new InternetExplorerDriver();
        } else if (browserName.equals(EDGE)) {
            WebDriverManager.edgedriver().setup();
            driver = new EdgeDriver();
        } else if (browserName.equals(FIREFOX)) {
            WebDriverManager.firefoxdriver().setup();
            driver = new FirefoxDriver();
        } else if (browserName.equals(CHROME)) {
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver();
        } else if (browserName.equals(SAFARI)) {
            WebDriverManager.safaridriver().setup();
            driver = new SafariDriver();
        } else if (browserName.equals("chrome-headless")) {
            ChromeOptions chromeOptions = new ChromeOptions();
            chromeOptions.addArguments("--headless");
            driver = new ChromeDriver(chromeOptions);
        } else if (browserName.equals("firefox-headless")) {
            FirefoxBinary firefoxBinary = new FirefoxBinary();
            firefoxBinary.addCommandLineOptions("--headless");
            FirefoxOptions firefoxOptions = new FirefoxOptions();
            firefoxOptions.setBinary(firefoxBinary);
            driver = new FirefoxDriver(firefoxOptions);
        } else {
            System.err.println("The browser " + browserName + " does not defined");
        }
        //Resize current window to the set dimension
        driver.manage().window().maximize();
        //To Delay execution for 10 sec. as to view the maximize browser
//        Thread.sleep(10000);
//        waiter = new WebDriverWait(driver, TIMEOUT);
        //Close the browser
//        driver.quit();
    }

    public static WebElement getElement(How how, String locator) {
//        return waiter.until(ExpectedConditions.visibilityOfElementLocated(how.buildBy(locator)));
        return driver.findElement(how.buildBy(locator));
    }

    public static List<WebElement> all(How how, String locator) {
//        return waiter.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(how.buildBy(locator)));
        return driver.findElements(how.buildBy(locator));
    }

    public static void fill(How how, String locator, String withString) {
        getElement(how, locator).clear();
        getElement(how, locator).sendKeys(withString);
    }


    public static void click(How how, String locator) {
        getElement(how, locator).click();
    }

    public static void click(By locator) {
        driver.findElements(locator);
    }

    public static void visit(String url) {
        driver.get(url);
    }

    public static void navigate(String url) {
        driver.navigate().to(url);
    }

    public static void backPreviousPage() {
        driver.navigate().back();
    }

    public static void select(How how, String locator, String option) {
        Select select = new Select(getElement(how, locator));
        select.selectByVisibleText(option);
    }

    public static void check(How how, String locator) {
        if (!getElement(how, locator).isSelected()) {
            click(how, locator);
        }
    }

    public static void uncheck(How how, String locator) {
        if (getElement(how, locator).isSelected()) {
            click(how, locator);
        }

    }

    public static void clickLinkText(String text) {
        click(How.LINK_TEXT, text);
    }

    public static String getText(How how, String locator) {
        return getElement(how, locator).getText();
    }

    public static void highlight(How how, String locator) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        try {
            js.executeScript("arguments[0].style.border='4px solid red'", getElement(how, locator));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Attachment(value = "Page screenshot", type = "image/png")
    public static byte[] saveScreenshot() {
        return ((TakesScreenshot)driver).getScreenshotAs(OutputType.BYTES);
    }
    public static void captureScreenShot() {
        File screenFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        String timeStamp = System.currentTimeMillis() / 1000 + "";
        File destFile = new File("./target/screenshot/" + "ScreenShot" + "-" + timeStamp + ".PNG");
        try {
            FileUtils.copyFile(screenFile, destFile);
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
    }

    public static void quit() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static Alert switchToAlertPopup() {
        return driver.switchTo().alert();
    }

    public static void switchToFrame(String name) {
        driver.switchTo().frame(name);
    }

    public static void switchToFrame(int index) {
        driver.switchTo().frame(index);
    }

    public static void switchToFrame(WebElement element) {
        driver.switchTo().frame(element);
    }

    public static WebDriver getDriver() {
        return driver;
    }
}
