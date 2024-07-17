// src/hooks/useUsers.js
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/sliceDataUsers"; // Assurez-vous que le chemin d'importation est correct
import { RootState } from "../store";
import { User } from "../types";

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  const userExists = (
    firstName: string,
    lastName: string,
    dateOfBirth: string
  ) => {
    return users.some((user) => {
      console.log(user.dateOfBirth, dateOfBirth); // Ajout du console.log pour vérification

      return (
        user.firstName === firstName &&
        user.lastName === lastName &&
        user.dateOfBirth === dateOfBirth
      );
    });
  };

  const addUserToList = (user: User) => {
    dispatch(addUser(user));
  };

  return { users, addUserToList, userExists };
};
