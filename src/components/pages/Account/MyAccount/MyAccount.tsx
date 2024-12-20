import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MyAccount.css";
import { updateUserInfo, getUserInfo } from "../../../store/actions/actions";
import { IUser, UserUpdateRequest } from "../../../BAL/Type";
import { RootState } from "../../../store/store";
import { IsValid } from "../../../BAL/CommonFunction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const [profession, setProfession] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const dispatch = useDispatch();

  const accountId: string | null = localStorage.getItem("accountId");
  const isSuccess: boolean = useSelector(
    (state: RootState) => state.home.isSuccess
  );
  const userId: string | null = localStorage.getItem("userId");
  const _email: string | null = localStorage.getItem("Email");
  const user: IUser = useSelector((state: RootState) => state.home.user);
  const error: string = useSelector((state: RootState) => state.home.error);
  useEffect(() => {
    if (!IsValid(name)) {
      //dispatch(getUserInfo(_email));
      setEmail(user?.email);
      setName(user?.name);
      setMobile(user?.Mobile);
      setProfession(user?.profession);
      setProfilePicture(user?.image);
    }
    if (isSuccess) {
      toast.success("User details updated.", { draggable: true });
    }
    if (IsValid(error)) {
      toast.error(error, { draggable: true });
    }
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (IsValid(accountId)) {
      const user: UserUpdateRequest = {
        _id: accountId,
        image: profilePicture,
        name: name,
        Mobile: mobile,
        profession: profession,
      };
      dispatch(updateUserInfo(user));
      setIsSaved(true);
    }
  };
  const handleImageSelect = (event: any) => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      typeof reader?.result === "string"
        ? setProfilePicture(reader?.result)
        : setProfilePicture("");
    };
  };
  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer></ToastContainer>
      <table>
        <tr>
          <td>Name</td>
          <td>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
            />
          </td>
        </tr>
        <tr>
          <td>Mobile Number</td>
          <td>
            <input
              type="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="Mobile Number"
            />
          </td>
        </tr>
        <tr>
          <td>Profession</td>
          <td>
            <input
              type="text"
              value={profession}
              onChange={(event) => setProfession(event.target.value)}
              placeholder="Profession"
            />
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            <input
              disabled
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
          </td>
        </tr>
        <tr>
          <td>Profile Picture</td>
          <td>
            {user?.image ? (
              <img className="imageCss" alt="Loading." src={profilePicture} />
            ) : (
              ""
            )}
            <input
              type="file"
              onChange={handleImageSelect}
              placeholder="Profile Picture"
            />
          </td>
        </tr>
        <tr>
          <td>
            <button type="submit">Submit</button>
          </td>
        </tr>
      </table>
    </form>
  );
};

export default MyAccount;
