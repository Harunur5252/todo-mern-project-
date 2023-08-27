import { tapiSlice } from "./tapiSlice";

const TODOS_URL = "/api/todos";
export const todoApiSlice = tapiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTodo: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    getAllTodo: builder.query({
      query: () => ({
        url: `${TODOS_URL}`,
        method: "GET",
      }),
      providesTags: ["Todo"],
    }),
    getUserTodos: builder.query({
      query: () => ({
        url: `${TODOS_URL}/user/todos`,
        method: "GET",
      }),
      providesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/${data?.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `${TODOS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useAddTodoMutation,useDeleteTodoMutation, useGetAllTodoQuery,useUpdateTodoMutation,useGetUserTodosQuery } = todoApiSlice;
