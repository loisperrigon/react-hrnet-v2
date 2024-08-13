import Header from "../../components/common/Header/Header";

import ListUsers from "../../components/ListUsers/ListUsers";

import "./Users.scss";

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
