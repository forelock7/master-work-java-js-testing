import LoginPage from "../../../pages/login/LoginPage";
import BooksPage from "../../../pages/books/BooksPage";
import {UserContext} from "../../../config/userContext";

class LoginPageSteps {
    openPage() {
        LoginPage.visit();
    }

    enterUsername(username) {
        LoginPage.enterUsername(username);
    }

    enterPassword(password) {
        LoginPage.enterPassword(password);
    }

    submit() {
        LoginPage.clickLoginButton();
    }

    // Method to handle full login flow
    login(userContext: UserContext) {
        this.openPage()
        this.enterUsername(userContext.username);
        this.enterPassword(userContext.password);
        this.submit();

        BooksPage.waitForLogOutLinkIsVisible()
    }
}

export default new LoginPageSteps();