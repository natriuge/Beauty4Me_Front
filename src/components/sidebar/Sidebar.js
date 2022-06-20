import React from "react";
import "../../pages/profile/profileStyle.css";
import { SidebarData } from "./SidebarData";

function Sidebar() {
  return (
    <div className="my-sidebar">
      <ul className="my-sidebar-list">
        {SidebarData.map((value, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === value.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = value.link;
              }}
            >
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
