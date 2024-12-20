import React, { useState, useEffect } from "react";
import "./Account.css";
import Page from "../../hoc/SwitchingComponent";
import { useDispatch, useSelector } from "react-redux";
import { IsValid } from "../../BAL/CommonFunction";
import { IUser } from "../../BAL/Type";
import { RootState } from "../../store/store";
import { getMainMenu, getUserInfo } from "../../store/actions/actions";
const Account = () => {
  const [page, setPage] = useState("MyAccount");
  const user: IUser = useSelector((state: RootState) => state.home.user);
  const dispatch = useDispatch();
  const _email: string | null = localStorage.getItem("Email");
  const accountId: string | null = localStorage.getItem("accountId");

  useEffect(() => {
    if (!IsValid(user?.name)) {
      dispatch(getUserInfo(_email));
    }
  }, []);
  return (
    <div>
      <div className="row">
        <div className="column1">
          <div className="vertical-menu">
            <ul>
              <li>
                <button onClick={() => setPage("MyAccount")}>Account</button>
              </li>
              <li>
                <button onClick={() => setPage("MainMenuForm")}>
                  Main Menu
                </button>
              </li>
              <li>
                <button onClick={() => setPage("SubMenuForm")}>Sub Menu</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="column2">
          <Page page={page}></Page>
        </div>
      </div>
    </div>
  );
};

export default Account;
