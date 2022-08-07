import logo from "./logo.jpg";
import { links, socialLinks } from "./data";
import "./styles.css";
import { useState, useRef, useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { ImCross } from "react-icons/im";

export default function Navbar() {
  const [hoverLink, setHoverLink] = useState(false);
  const checkClick = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (checkClick.current && !checkClick.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setHoverLink(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkClick]);

  return (
    <div className="navbar">
      <div className="menuLogo">
        <img src={logo} alt="logo" />
      </div>

      <div
        className={`${hoverLink ? "showMenuLinks" : "menuLinks"}`}
        ref={checkClick}
      >
        {links.map((value) => {
          const { id, link, text } = value;
          return (
            <ul key={id} className="menuLinkList">
              <li className="menuLinkItems">
                <a href={link}> {text} </a>
              </li>
            </ul>
          );
        })}
      </div>
      <div className="menuIconSection">
        {hoverLink ? (
          <ImCross
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => {
              setHoverLink(!hoverLink);
            }}
          />
        ) : (
          <HiOutlineMenuAlt2
            className="menuIcon"
            onClick={() => {
              setHoverLink(!hoverLink);
            }}
          />
        )}
      </div>

      <div className="socialMediaLinks">
        {socialLinks.map((links) => {
          return (
            <ul key={links.id} className="socialMediaList">
              <li className="socialMediaItems">
                <a href={links.link}> {links.icons} </a>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
