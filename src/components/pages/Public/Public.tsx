import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Public.css";
import { getContent } from "../../store/actions/actions";
import { IContent } from "../../BAL/Type";
import { useParams } from "react-router-dom";
const Public = () => {
  const dispatch = useDispatch();
  const filteredContent = useSelector(
    (state: any) => state.home.filteredContent
  );
  const { id } = useParams();
  useEffect(() => {
    handleFetchContent(id);
  }, [id]);
  const handleFetchContent = (id: string | undefined) => {
    dispatch(getContent(id));
  };
  return (
    <div>
      <h1>Public!</h1>
      <ul>
        {filteredContent &&
          filteredContent.map((data: IContent, index: number) => {
            return (
              <li key={index}>
                <table>
                  <tr>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <div dangerouslySetInnerHTML={{ __html: data.value }} />
                    </td>
                  </tr>
                </table>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Public;
