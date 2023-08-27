import Loader from "../component/Loader";
import {
  useGetUserTodosQuery,
} from "../slices/todoApiSlice";
import SearchForm from "../component/SearchForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";

function GetAllUserTodos() {
  const [search, setSearch] = useState("");
  const { data, status, error, isError, isLoading } = useGetUserTodosQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const searchAllUserTodoData = data?.filter(
    (todo) =>
      todo?.title.toLowerCase().includes(search.toLowerCase()) ||
      todo?.description.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <>
      <h2 className="text-center  mt-2">{userInfo?.name} All Todos</h2>
      {isLoading && (
        <Loader width="40px" height="40px" size="md" fontSize="40px" />
      )}
      {(isError || error?.data?.errMsg) && (
        <h4 style={{ color: "red" }} className="text-center  mt-4">
          error occurs
        </h4>
      )}
      {(status === "pending" || status === "rejected") && (
        <h4 style={{ color: "red" }} className="text-center  mt-4">
          user todos not found
        </h4>
      )}
      {userInfo && <SearchForm search={search} setSearch={setSearch} />}
      {searchAllUserTodoData?.map((todo) => {
        return <Todo key={todo?._id} todo={todo} />;
      })}
    </>
  );
}

export default GetAllUserTodos;
