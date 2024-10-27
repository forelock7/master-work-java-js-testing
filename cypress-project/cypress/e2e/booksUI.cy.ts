import LoginPageSteps from "../steps/ui/login/loginPageSteps";
import {UserContext} from "../config/userContext";

describe('template spec', () => {
  const userContext = new UserContext();
  it('passes', () => {
    LoginPageSteps.login(userContext);
  })
})