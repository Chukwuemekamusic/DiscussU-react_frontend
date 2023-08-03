import { create } from "zustand";
import axios from "axios";
import BASE_URL from "./api/apiConfig";
import { getHeaders } from "./api/getHeaders";
import Cookies from "js-cookie";
import { ErrorCheck } from "./components/utils/utilFunctions";
// import useErrorCheck from "./components/utils/useErrorCheck";

const token = Cookies.get("token");

const useHomeStore = create((set) => ({
  rooms: [],
  categories: [],
  reportCategories: [],
  isopen: false,
  schools: [],
  user: null,
  students: [],
  following: [],
  errorMessage: "",
  isSorted: false,

  setRooms: (data) => set(() => ({ rooms: data })),
  setCategories: (data) => set(() => ({ categories: data })),
  setReportCategories: (data) => set(() => ({ reportCategories: data })),
  setIsopen: () => set((state) => ({ isopen: !state.isopen })),
  setClose: () => set(() => ({ isopen: false })),
  setSchools: (data) => set(() => ({ schools: data })),
  setUser: (data) => set(() => ({ user: data })),
  setStudents: (data) => set(() => ({ students: data })),
  setFollowing: (data) => set(() => ({ following: data })),
  setErrorMessage: (data) => set(() => ({ errorMessage: data })),
  setIsSorted: () => set((state) => ({ isSorted: !state.isSorted })),

  updateFollowData: async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        BASE_URL + `users/follow-status/`,
        getHeaders(token)
      );
      const following = await response.data;

      localStorage.setItem("following", JSON.stringify(following));
      set((state) => ({ ...state, following: following }));
    } catch (error) {
      ErrorCheck(error);
    }
  },

  isFollowedUser: (userId) => {
    // const followedUsers = useHomeStore.getState().following;
    const followedUsers = JSON.parse(localStorage.getItem("following"));
    return followedUsers.some((user) => user.followed_user === userId);
  },

  // sortRoomsByCategory
  updateRoomsData: async () => {
    try {
      const response = await axios.get(BASE_URL + `rooms/`, getHeaders(token));
      const data = await response.data;
      set({ rooms: data });
    } catch (error) {
      ErrorCheck(error);
    }
  },

  updateUserData: async () => {
    // const token = Cookies.get("token");
    try {
      const response = await axios.get(
        BASE_URL + `users/details/`,
        getHeaders(token)
      );
      const user = await response.data;

      localStorage.setItem("user", JSON.stringify(user));
      set((state) => ({ user: user, ...state }));
    } catch (error) {
      ErrorCheck(error);
    }
  },

  returnUserData: async (t) => {
    // const token = Cookies.get("token");
    try {
      const response = await axios.get(
        BASE_URL + `users/details/`,
        getHeaders(t)
      );
      const user = await response.data;

      return user;
    } catch (error) {
      ErrorCheck(error);
    }
  },

  getStudentsProfile: async () => {
    // const token = Cookies.get("token");
    try {
      const response = await axios.get(
        BASE_URL + `users/profiles/`,
        getHeaders(token)
      );
      const students = await response.data;

      localStorage.setItem("students", JSON.stringify(students));
      // set((state) => ({ students: students, ...state }));
      set((state) => ({ students: students, ...state }));
    } catch (error) {
      ErrorCheck(error);
    }
  },

  getStudentById: (studentId) => {
    const students = JSON.parse(localStorage.getItem("students"));
    const student = students.find(
      (student) => student.id === parseInt(studentId)
    );
    return student;
  },

  setImageUrl: () => {
    const profilePicPath = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).profile_pic
      : null;
    const ImageBase_URL = BASE_URL;

    if (profilePicPath) {
      set({ imageUrl: `${ImageBase_URL}${profilePicPath}` });
    } else {
      set({ imageUrl: null });
    }
  },
}));

const useStoreFns = create((set) => ({
  // Your existing state and actions...

  deleteRoom: async (roomId) => {
    try {
      // Make an API call to delete the room
      await axios.delete(
        BASE_URL + `rooms/${roomId}/`,
        getHeaders(token)
      );

      useHomeStore.getState().updateRoomsData();
    } catch (error) {
      console.error(error);
      ErrorCheck(error);
      // Handle any errors that occurred during the deletion process.
      // For example, you can show an error message to the user.
    }
  },
}));

export { useHomeStore, useStoreFns };

// Optionally, you can fetch the updated room list after the deletion
// using your existing getRoomsData action if you have one.

// Update the state or perform any other actions after successful deletion
// For example, you can remove the deleted room from the room list in the state.

// For simplicity, I'm not updating the state here. You can update it according to your application's state structure.
