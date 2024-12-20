import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  IMainMenu,
  NewMainMenuRequest,
  MainMenuUpdateRequest,
} from "../../../BAL/Type";
import "./MainMenuForm.css";
import {
  createMainMenu,
  deleteMainMenu,
  updateMainMenu,
} from "../../../store/actions/actions";
import { IsValid } from "../../../BAL/CommonFunction";
import { RootState } from "../../../store/store";
import { ToastContainer, toast } from "react-toastify";
const MainMenuForm = () => {
  const accountId: string | null = localStorage.getItem("accountId");

  const dispatch = useDispatch();
  const mainMenu = useSelector((state: any) => state.home.mainMenu);
  const [selectValue, setSelectValue] = useState("");
  const [newMenu, setNewMenu] = useState("");
  const [tempId, setTempId] = useState("");
  const [name, setName] = useState("");
  const isSuccess: boolean = useSelector(
    (state: RootState) => state.home.isSuccess
  );
  const error: string = useSelector((state: RootState) => state.home.error);

  useEffect(() => {
    if (IsValid(error)) {
      toast.error(error, { draggable: true });
    }
  }, [newMenu]);
  const handleSubMenuDelete = (id: string, name: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      console.log("Code for Delete" + id + name);
      //this.props.onSubMenuDelete(name,id);
    }
  };
  const handleCancel = () => {
    setTempId("");
    setName("");
  };
  const handleSubMenuSave = (id: string, userId: string) => {
    if (IsValid(name) && IsValid(id)) {
      const updateRequest: MainMenuUpdateRequest = {
        _id: id,
        userId: userId,
        name: name,
      };
      dispatch(updateMainMenu(updateRequest));
      toast.success("Menu updated.", { draggable: true });
      setTempId("");
    }
  };
  const handleInput = (event: Event) => {
    setName("");
    //this.setState({tempId:""});
  };
  const handleEdit = (id: string, name: string) => {
    setTempId(id);
    setName(name);
  };

  const handleAddNewManu = () => {
    if (mainMenu.length === 6) {
      toast.warning("Can not add more then 6 mamnu", { draggable: true });
    } else {
      if (IsValid(newMenu)) {
        const newMenuRequest: NewMainMenuRequest = {
          userId: accountId,
          name: newMenu,
        };
        dispatch(createMainMenu(newMenuRequest));
        if (IsValid(newMenu)) {
          toast.success("Menu saved.", { draggable: true });
          setNewMenu("");
        }
      }
    }
  };
  const handleDelete = (id: string) => {
    dispatch(deleteMainMenu(id));
    if (IsValid(id)) {
      toast.success("Menu Deleted.", { draggable: true });
    }
  };

  return (
    <div className="MainMenuDiv">
      <h1>MainMenuForm</h1>
      <ToastContainer></ToastContainer>
      <table>
        <tr>
          <td>
            <input
              type="text"
              value={newMenu}
              onChange={(event) => setNewMenu(event.target.value)}
            />
          </td>
          <td>
            <button onClick={handleAddNewManu}>Add</button>
          </td>
        </tr>
      </table>
      <nav>
        <ul>
          {mainMenu &&
            mainMenu.map((data: IMainMenu, index: number) => {
              return (
                <li key={index}>
                  <table>
                    <tr>
                      <td>
                        {tempId === data._id ? (
                          <input
                            name={data._id}
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          ></input>
                        ) : (
                          data.name
                        )}
                      </td>
                      <td>
                        {tempId === data._id ? (
                          <div>
                            <button
                              onClick={() =>
                                handleSubMenuSave(data._id, data.userId)
                              }
                            >
                              Save
                            </button>{" "}
                            / <button onClick={handleCancel}>Cancel</button>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={() => handleEdit(data._id, data.name)}
                              style={{ color: "green" }}
                              className="btn btn-link"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                            >
                              Edit
                            </button>
                            <button onClick={() => handleDelete(data._id)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                      <td></td>
                    </tr>
                  </table>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

export default MainMenuForm;
