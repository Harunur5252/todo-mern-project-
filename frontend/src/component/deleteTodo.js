import React from 'react'
import { useDeleteTodoMutation } from '../slices/todoApiSlice';

function deleteTodo({ handleDelete }) {
    const [deleteTodo, { isLoading }] = useDeleteTodoMutation();
  const handleDelete = async (_id) => {
    try {
      const res = await deleteTodo(_id).unwrap();
      if (res?.error?.data?.errMsg) {
        return toast.error(res?.error?.data?.errMsg);
      }
      toast.success("todo deleted successfully!");
    } catch (err) {
      toast.error(err?.data?.errMsg);
    }
  };
}

export default deleteTodo;