import Header from "../../components/communs/header/header";

import ListUsers from "../../components/listUsers/listUsers";

import "./users.scss";

export default function Users() {
  return (
    <>
      <Header />
      <div className="contentUser">
        <ListUsers />
      </div>
    </>
  );
}
