import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "@/utils/cookies";

const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    return "/api/v1/";
  }
  return "/api/proxy/";
};

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getAuthToken() || getState().auth.token;
    if (token) {
      headers.set("authorization", `Token ${token}`);
    }
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        const isDev = import.meta.env.DEV;
        return {
          url: isDev ? "login/" : "?path=login/",
          method: "POST",
          body: credentials,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getUsers: builder.query({
      query: (params = {}) => {
        const isDev = import.meta.env.DEV;
        return {
          url: isDev ? "users/" : "?path=users/",
          params,
        };
      },
      providesTags: ["User"],
    }),

    getUser: builder.query({
      query: (id) => {
        const isDev = import.meta.env.DEV;
        return isDev ? `users/${id}/` : `?path=users/${id}/`;
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation({
      query: (user) => {
        const isDev = import.meta.env.DEV;
        return {
          url: isDev ? "users/" : "?path=users/",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...user }) => {
        const isDev = import.meta.env.DEV;
        return {
          url: isDev ? `users/${id}/` : `?path=users/${id}/`,
          method: "PATCH",
          body: user,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        const isDev = import.meta.env.DEV;
        return {
          url: isDev ? `users/${id}/` : `?path=users/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;
