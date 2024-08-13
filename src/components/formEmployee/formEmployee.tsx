import React, { useState } from "react";
import { FaCity } from "react-icons/fa";
import { useToasts } from "../../context/ToastContext";
import { useUsers } from "../../hooks/useUsers";
import Input from "../common/Input/Input";

import { ToastFormEmployeeBad } from "../common/Toasts/Toast/model/bad";
import { ToastFormEmployeeGood } from "../common/Toasts/Toast/model/good";
import "./FormEmployee.scss";

//Calendar

import "react-datepicker/dist/react-datepicker.css";
import CustomDatePickerInput from "../common/CustomDatePickerInput/CustomDatePickerInput";

import { Dropdown } from "dropdownopenclassroom";
import "../../scss/dropdown.scss";
import { formatDate } from "../../utils/utils";
import { departement, states } from "./constants";
// Définition du type pour les données du formulaire
interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  startDate: Date;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

/**
 * Composant `FormEmployee`
 *
 * Affiche un formulaire pour créer un nouvel employé, utilisant `useUsers` pour la gestion
 * des utilisateurs et `useToasts` pour les notifications. Gère la validation des données,
 * les changements de champs, et l'affichage de toasts en cas de succès ou d'erreur.
 *
 * Fonctionnalités :
 * - Validation et envoi des données du formulaire.
 * - Gestion des champs de texte, dates et options de sélection.
 * - Affichage des notifications selon la validation.
 */
export default function FormEmployee() {
  const { addUserToList, userExists } = useUsers();
  const { showToast } = useToasts();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    startDate: new Date(),
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  /**
   * Fonction `validateForm`
   *
   * Valide les données du formulaire. Retourne `true` si toutes les données sont valides, sinon
   * un message d'erreur correspondant au champ invalide. Vérifie les champs obligatoires, les dates,
   * et l'existence de l'utilisateur.
   *
   * @param formData - Données du formulaire à valider.
   * @returns `true` si valide, sinon un message d'erreur.
   */
  function validateForm(formData: FormData): true | string {
    if (!formData.firstName.trim()) return "First Name is required.";
    if (!formData.lastName.trim()) return "Last Name is required.";
    if (isNaN(formData.dateOfBirth.getTime())) return "Invalid Date of Birth.";
    if (isNaN(formData.startDate.getTime())) return "Invalid Start Date.";
    if (!formData.street.trim()) return "Street is required.";
    if (!formData.city.trim()) return "City is required.";
    if (!formData.state.trim()) return "State is required.";
    if (!formData.zipCode.trim()) return "Zip Code is required.";
    if (!/^\d{5}$/.test(formData.zipCode)) return "Zip Code must be 5 digits.";
    if (!formData.department.trim()) return "Department is required.";
    if (
      userExists(
        formData.firstName.trim(),
        formData.lastName.trim(),
        formatDate(formData.dateOfBirth.toDateString())
      )
    )
      return "L'utilisateur existe deja";
    return true;
  }

  const [selectedState, setSelectedState] = useState("Choose a state");
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Choose a department"
  );

  /**
   * Fonction `handleChange`
   *
   * Met à jour les données du formulaire en fonction des changements dans les champs de texte.
   *
   * @param e - Événement de changement de l'élément input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /**
   * Fonction `handleDateChange`
   *
   * Met à jour les données du formulaire avec la nouvelle date sélectionnée.
   *
   * @param name - Nom du champ de date.
   * @param date - Nouvelle date sélectionnée.
   */
  const handleDateChange = (name: keyof FormData, date: Date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }));
  };

  /**
   * Fonction `handleOptionSelect`
   *
   * Met à jour les données du formulaire et les états sélectionnés pour les dropdowns.
   *
   * @param option - Option sélectionnée.
   * @param type - Type de dropdown ('state' ou 'department').
   */
  const handleOptionSelect = (option: string, type: "state" | "department") => {
    if (type === "state") {
      setSelectedState(option);
      setFormData((prevFormData) => ({
        ...prevFormData,
        state: option,
      }));
    } else if (type === "department") {
      setSelectedDepartment(option);
      setFormData((prevFormData) => ({
        ...prevFormData,
        department: option,
      }));
    }
  };

  /**
   * Fonction `handleSubmit`
   *
   * Valide les données du formulaire, affiche un toast de succès ou d'erreur, et soumet les données
   * si elles sont valides.
   *
   * @param e - Événement de soumission du formulaire.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = validateForm(formData);
    if (validationResult === true) {
      const convertedFormData = {
        //Pour le reduc qui utilise des string dans le local storage
        ...formData,
        dateOfBirth: formatDate(formData.dateOfBirth.toDateString()),
        startDate: formatDate(formData.startDate.toDateString()),
      };

      showToast(<ToastFormEmployeeGood firstname={formData.firstName} />);
      addUserToList(convertedFormData);
    } else {
      showToast(<ToastFormEmployeeBad validationResult={validationResult} />);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={"formEmployee"}>
      <h2 className="formEmployee_title">Create Employee</h2>

      <div className="formEmployee_inputs">
        <div className="formEmployee_grid">
          <Input
            name={"firstName"}
            label={"First Name"}
            type={"text"}
            textInput={"Lola"}
            handleChange={handleChange}
          />
          <Input
            name={"lastName"}
            label={"Last Name"}
            type={"text"}
            textInput={"Smitz"}
            handleChange={handleChange}
          />

          <CustomDatePickerInput
            name="dateOfBirth"
            label="Date of Birth"
            selected={formData.dateOfBirth}
            onChange={(date: any) =>
              handleDateChange("dateOfBirth", date as Date)
            }
          />
          <CustomDatePickerInput
            name="startDate"
            label="Start Date"
            selected={formData.startDate}
            onChange={(date: any) =>
              handleDateChange("startDate", date as Date)
            }
          />

          <Input
            name={"street"}
            label={"Street"}
            type={"text"}
            textInput={"jeanne d'arc"}
            handleChange={handleChange}
          />

          <Input
            name={"city"}
            label={"City"}
            icon={<FaCity />}
            type={"text"}
            textInput={"Springfield"}
            handleChange={handleChange}
          />

          <div>
            <label htmlFor={"Departement"} className="input-label">
              State
            </label>
            <div className="relative">
              <Dropdown
                options={states}
                selectedOption={selectedState}
                onOptionSelect={(option) => handleOptionSelect(option, "state")} // Gestion de la sélection pour l'état
              />
            </div>
          </div>

          <Input
            name={"zipCode"}
            label={"Zip code"}
            type={"text"}
            textInput={"74800"}
            handleChange={handleChange}
          />
        </div>

        <div className="formEmployee_departement">
          <label htmlFor={"Departement"} className="input-label">
            Departement
          </label>
          <div className="relative">
            <Dropdown
              options={departement}
              selectedOption={selectedDepartment}
              onOptionSelect={(option) =>
                handleOptionSelect(option, "department")
              } // Gestion de la sélection pour le département
            />
          </div>
        </div>
      </div>
      <button className="formEmployee_button" type="submit">
        Submit
      </button>
    </form>
  );
}
