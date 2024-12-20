import MyAccount from "../pages/Account/MyAccount/MyAccount";
import About from "../pages/About";
import SubMenuForm from "../pages/Account/SubMenuForm/SubMenuForm";
import MainMenuForm from "../pages/Account/MainMenuForm/MainMenuForm";
const PAGES: any = {
  MyAccount: MyAccount,
  About: About,
  MainMenuForm: MainMenuForm,
  SubMenuForm: SubMenuForm,
};
const Page = (props: any) => {
  const Handler = PAGES[props.page] || About;

  return <Handler {...props} />;
};

export default Page;
