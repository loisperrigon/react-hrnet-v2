import Header from "../../components/communs/header/header";

import FormEmployee from "../../components/formEmployee/formEmployee";

import "./formulaire.scss";

export default function Formulaire() {
  return (
    <>
      <Header />
      <div className="content">
        <FormEmployee />
      </div>
    </>
  );
}
