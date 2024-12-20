import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./MainMenu.css";
import { IMainMenu } from "../../BAL/Type";
import { getMainMenu } from "../../store/actions/actions";
const MainMenu = () => {
  const dispatch = useDispatch();
  const accountId: string | null = localStorage.getItem("accountId");
  const mainMenu: IMainMenu[] = useSelector(
    (state: any) => state.home.mainMenu
  );
  useEffect(() => {
    dispatch(getMainMenu(accountId));
  }, [accountId]);
  return (
    <div>
      <header>
        <nav>
          <ul>
            {mainMenu &&
              mainMenu.map((data: IMainMenu, index: number) => {
                return (
                  <li key={index}>
                    <Link to={`/content/${data._id}`}>{data.name}</Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default MainMenu;
