import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./content-details.css";
import { Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  getContent,
  createContent,
  deleteContent,
  updateContent,
} from "../../store/actions/actions";
import { IContent, ContentRequest } from "../../BAL/Type";
import { ToastContainer, toast } from "react-toastify";
import { IsValid } from "../../BAL/CommonFunction";
import { RootState } from "../../store/store";
import { Console, table } from "console";
interface Props {
  subMenuId: string | undefined;
}
const ContentDetails: React.FC<Props> = ({ subMenuId }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const [val, setVal] = useState("");
  const [keyEdit, setKeyEdit] = useState("");
  const [valEdit, setValEdit] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const [tempId, setTempId] = useState("");
  const isSuccess: boolean = useSelector(
    (state: RootState) => state.home.isSuccess
  );
  const filteredContent: IContent[] = useSelector(
    (state: any) => state.home.filteredContent
  );
  useEffect(() => {
    if (IsValid(subMenuId)) {
      setDisabled(false);
      dispatch(getContent(subMenuId));
    } else {
      setDisabled(true);
      setKey("");
      setVal("");
    }
  }, [subMenuId]);

  const handleSaveContent = () => {
    if (IsValid(subMenuId) && IsValid(key) && IsValid(val)) {
      const createRequest: ContentRequest = {
        _id: "",
        smid: typeof subMenuId != "undefined" ? subMenuId : "",
        name: key,
        value: val,
      };
      dispatch(createContent(createRequest));
      //if (isSuccess) {
      setKey("");
      setVal("");
      toast.success("Conent Added.", { draggable: true });
      //}
      dispatch(getContent(subMenuId));
    } else {
      toast.error("Fill required details", { draggable: true });
    }
  };
  const handleContentUpdate = (id: string, smid: string) => {
    if (IsValid(id) && IsValid(keyEdit) && IsValid(valEdit)) {
      const updateRequest: ContentRequest = {
        _id: id,
        smid: typeof smid != "undefined" ? smid : "",
        name: keyEdit,
        value: valEdit,
      };
      dispatch(updateContent(updateRequest));
      if (isSuccess) {
        setTempId("");
        setKey("");
        setVal("");
        setKeyEdit("");
        setValEdit("");
        toast.success("Conent Updated.", { draggable: true });
      }
      dispatch(getContent(subMenuId));
    } else {
      toast.error("Fill required details", { draggable: true });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      dispatch(deleteContent(id));
      if (IsValid(id)) {
        toast.success("Item Deleted.", { draggable: true });
      }
    }
  };

  const handleEdit = (id: string, key: string, val: string) => {
    setTempId(id);
    setKeyEdit(key);
    setValEdit(val);
  };
  const handleCancel = () => {
    setTempId("");
    setKey("");
    setVal("");
    setKeyEdit("");
    setValEdit("");
  };

  const onChange = (data: string) => {
    setVal(data);
  };
  const onChangeEdit = (data: string) => {
    setValEdit(data);
  };
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula", "table"],
    // [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    //[{ script: "sub" }, { script: "super" }],  superscript/subscript
    //[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    //[{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    //[{ align: [] }],
    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <>
      <Link to={`/public/${subMenuId}`}>View Page</Link>
      <ToastContainer></ToastContainer>
      <table>
        <tr>
          <table>
            <tr>
              <td>
                <input
                  className="Input-css"
                  type="text"
                  value={key}
                  minLength={1}
                  maxLength={40}
                  disabled={disabled}
                  onChange={(event) => setKey(event.target.value)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <ReactQuill
                  className="ReactQuillCSS"
                  theme="snow"
                  value={val}
                  // modules={modules}
                  onChange={(event: string) => onChange(event)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button disabled={disabled} onClick={handleSaveContent}>
                  Add Content
                </button>
              </td>
            </tr>
          </table>

          {/* <input
            type="text"
            value={val}
            disabled={disabled}
            onChange={(event) => setVal(event.target.value)}
          ></input> */}
        </tr>
      </table>
      <ul className="ContentList">
        {filteredContent != null &&
          typeof filteredContent != "undefined" &&
          filteredContent.map((data: IContent, index: number) => {
            return (
              <li key={index}>
                <table>
                  <tr>
                    <td>
                      {tempId === data._id ? (
                        <input
                          className="Input-css"
                          name={data._id}
                          type="text"
                          value={keyEdit}
                          minLength={1}
                          maxLength={40}
                          onChange={(event) => setKeyEdit(event.target.value)}
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
                              handleContentUpdate(data._id, data.smid)
                            }
                          >
                            Save
                          </button>
                          <button onClick={handleCancel}>Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleEdit(data._id, data.name, data.value)
                          }
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(data._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {tempId === data._id ? (
                        <ReactQuill
                          className="ReactQuillCSS"
                          theme="snow"
                          value={valEdit}
                          // modules={modules}
                          onChange={(event: string) => onChangeEdit(event)}
                        />
                      ) : (
                        // <input
                        //   name={data._id}
                        //   type="text"
                        //   value={valEdit}
                        //   onChange={(event) => setValEdit(event.target.value)}
                        // />
                        <div dangerouslySetInnerHTML={{ __html: data.value }} />
                      )}
                    </td>
                  </tr>
                </table>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ContentDetails;
