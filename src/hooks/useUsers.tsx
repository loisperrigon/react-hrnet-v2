// src/hooks/useUsers.js
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/sliceDataUsers"; // Assurez-vous que le chemin d'importation est correct
import { RootState } from "../store";
import { User } from "../types";

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  /**
   * Vérifie si un utilisateur existe déjà dans la liste, en se basant sur
   * le prénom, le nom et la date de naissance.
   *
   * @param {string} firstName - Prénom de l'utilisateur à vérifier.
   * @param {string} lastName - Nom de famille de l'utilisateur à vérifier.
   * @param {string} dateOfBirth - Date de naissance de l'utilisateur à vérifier, au format "dd/mm/yyyy".
   * @returns {boolean} True si l'utilisateur existe déjà, sinon false.
   */
  const userExists = (
    firstName: string,
    lastName: string,
    dateOfBirth: string
  ) => {
    return users.some((user) => {
      return (
        user.firstName.toLowerCase() === firstName.toLowerCase() &&
        user.lastName.toLowerCase() === lastName.toLowerCase() &&
        user.dateOfBirth === dateOfBirth
      );
    });
  };

  /**
   * Ajoute un nouvel utilisateur à la liste des utilisateurs dans le store Redux.
   *
   * @param {User} user - L'utilisateur à ajouter à la liste.
   */
  const addUserToList = (user: User) => {
    dispatch(addUser(user));
  };

  return { users, addUserToList, userExists };
};
