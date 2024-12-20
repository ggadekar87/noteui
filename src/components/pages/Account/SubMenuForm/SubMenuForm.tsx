import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SubMenuForm.css";
import { ToastContainer, toast } from "react-toastify";
import {
  getMainMenu,
  getSubMenu,
  deleteSubMenu,
  createSubMainMenu,
  updateSubMainMenu,
} from "../../../store/actions/actions";
import { IMainMenu, ISubMenu, NewSubMainMenuRequest } from "../../../BAL/Type";
import { RootState } from "../../../store/store";
import { IsValid } from "../../../BAL/CommonFunction";
const SubMenuForm = () => {
  const _mainMenu: IMainMenu[] = useSelector(
    (state: RootState) => state.home.mainMenu
  );
  const sunMenu: ISubMenu[] = useSelector(
    (state: RootState) => state.home.sunMenu
  );
  const [selectMenuId, setSelectMenuId] = useState("");
  const filteredSubMenu: ISubMenu[] = useSelector(
    (state: any) => state.home.filteredSubMenu
  );
  const [selectValue, setSelectValue] = useState("");
  const [tempId, setTempId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [newSubMenu, setNewSubMenu] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const accountID = localStorage.getItem("accountId");
    dispatch(getMainMenu(accountID));
    if (!IsValid(selectMenuId)) {
      dispatch(getSubMenu(""));
    }
  }, []);
  const handleChange = (e: any) => {
    setSelectMenuId(e.target.value);
    if (IsValid(e.target.value)) {
      dispatch(getSubMenu(e.target.value));
    }
  };
  const handleEdit = (id: string, name: string) => {
    setTempId(id);
    setName(name);
  };
  const handleInput = (event: any) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleCancel = () => {
    setTempId("");
    setName("");
  };

  const handleSubMenuSave = (id: string, userId: string) => {
    if (IsValid(name) && IsValid(id) && IsValid(selectMenuId)) {
      const updateRequest: NewSubMainMenuRequest = {
        _id: id,
        mid: selectMenuId,
        name: name,
      };
      dispatch(updateSubMainMenu(updateRequest));
      toast.success("Menu updated.", { draggable: true });
      setTempId("");
    }
  };

  const handleSubMenuDelete = (id: string, name: string) => {
    //Delete main menu - Delete Content -> Delete Sub Menues -> Delete Main Menu.
    if (window.confirm("Are you sure to delete this record?")) {
      if (IsValid(id)) {
        dispatch(deleteSubMenu(id));
        toast.success("Menu Deleted.", { draggable: true });
      }
      //this.props.onSubMenuDelete(name, id);
    }
  };
  const handleAddNewSubManu = () => {
    if (IsValid(newSubMenu)) {
      const newSubMenuRequest: NewSubMainMenuRequest = {
        _id: "",
        mid: selectMenuId,
        name: newSubMenu,
      };
      dispatch(createSubMainMenu(newSubMenuRequest));
      if (IsValid(newSubMenu)) {
        toast.success("Menu saved.", { draggable: true });
        setNewSubMenu("");
        if (IsValid(selectMenuId)) {
          dispatch(getSubMenu(selectMenuId));
        }
      }
    }
  };

  return (
    <div>
      <h1>SubMenuForm</h1>
      <ToastContainer></ToastContainer>
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
      <table>
        <thead>
          <tr>
            <th scope="col">
              <select
                name="cars"
                id="cars"
                value={selectMenuId}
                onChange={(e) => handleChange(e)}
                className="custom-select"
                style={{ width: "200px" }}
              >
                <option value="">--Select Menu--</option>
                {_mainMenu
                  ? _mainMenu.map((data: IMainMenu, index: number) => {
                      return (
                        <option key={data._id} value={data._id}>
                          {data.name}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        {
          <tbody>
            {error
              ? error
              : filteredSubMenu &&
                filteredSubMenu.map((item: any) => {
                  return (
                    <tr>
                      <td>
                        <div
                          className="nav-item"
                          key={item._id}
                          style={{
                            padding: "6px",
                          }}
                        >
                          {tempId === item._id ? (
                            <input
                              name={item._id}
                              type="text"
                              value={name}
                              onChange={handleInput}
                            ></input>
                          ) : (
                            item.name
                          )}
                        </div>
                      </td>
                      <td>
                        {tempId === item._id ? (
                          <div>
                            <button
                              onClick={() =>
                                handleSubMenuSave(item._id, item.name)
                              }
                            >
                              Save
                            </button>
                            / <button onClick={handleCancel}>Cancel</button>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={() => handleEdit(item._id, item.name)}
                              style={{ color: "green" }}
                              className="btn btn-link"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                            >
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                className="bi bi-pencil-square"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                            </button>
                            /
                            <button
                              onClick={() =>
                                handleSubMenuDelete(item._id, item.name)
                              }
                              style={{ color: "red" }}
                              className="btn btn-link"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                            >
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                className="bi bi-trash"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        }
      </table>
    </div>
  );
};

export default SubMenuForm;
