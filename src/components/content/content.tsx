import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./content.css";
import ContentDetails from "./content-details/content-details";
import { getSubMenu, createSubMainMenu } from "../store/actions/actions";
import { ISubMenu, NewSubMainMenuRequest } from "../BAL/Type";
import { IsValid } from "../BAL/CommonFunction";
import { ToastContainer, toast } from "react-toastify";

const Content = () => {
  const dispatch = useDispatch();
  const [subMenuId, setSubMenuId] = useState("");
  const [newSubMenu, setNewSubMenu] = useState("");
  const filteredSubMenu: ISubMenu[] = useSelector(
    (state: any) => state.home.filteredSubMenu
  );
  const { id } = useParams();
  useEffect(() => {
    handleToggle(id);
    setSubMenuId("");
  }, [id]);
  const handleToggle = (id: string | undefined) => {
    dispatch(getSubMenu(id));
  };

  const handleAddNewSubManu = () => {
    if (IsValid(newSubMenu)) {
      const newSubMenuRequest: NewSubMainMenuRequest = {
        _id: "",
        mid: id != null ? id : "",
        name: newSubMenu,
      };
      dispatch(createSubMainMenu(newSubMenuRequest));
      if (IsValid(newSubMenu)) {
        toast.success("Menu saved.", { draggable: true });
        setNewSubMenu("");
        if (IsValid(id)) {
          dispatch(getSubMenu(id));
        }
      }
    }
  };

  const handleClick = (id: string) => {
    setSubMenuId(id);
  };
  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="row">
        <div className="column1">
          <div className="vertical-menu">
            <table>
              <tr>
                <td>
                  <input
                    type="text"
                    value={newSubMenu}
                    onChange={(event) => setNewSubMenu(event.target.value)}
                  />
                </td>
                <td>
                  <button onClick={handleAddNewSubManu}>Add</button>
                </td>
              </tr>
            </table>
            <ul>
              {filteredSubMenu &&
                filteredSubMenu.map((data: ISubMenu, index: number) => {
                  return (
                    <li key={index}>
                      <button
                        style={{ width: "150px" }}
                        className="nav-link active"
                        onClick={() => handleClick(data._id)}
                      >
                        {data.name}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="column2">
          <ContentDetails subMenuId={subMenuId} />
        </div>
      </div>
    </div>
  );
};

export default Content;
