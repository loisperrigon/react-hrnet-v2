import Header from "../../components/common/Header/Header";

import FormEmployee from "../../components/FormEmployee/FormEmployee";

import "./Formulaire.scss";

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
