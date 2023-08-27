import Loader from "../component/Loader";
import Todo from "./Todo";
import SearchForm from "../component/SearchForm";
import { useState } from "react";
import { useGetAllTodoQuery } from "../slices/todoApiSlice";
import { useSelector } from "react-redux";

function AllTodo() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllTodoQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const searchAllTodoData = data?.filter(
    (todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      {userInfo && <SearchForm search={search} setSearch={setSearch} />}
      {isLoading && (
        <Loader width="40px" height="40px" size="md" fontSize="40px" />
      )}
      {searchAllTodoData?.map((todo) => {
        return <Todo key={todo?._id} todo={todo} />;
      })}
    </>
  );
}

export default AllTodo;
