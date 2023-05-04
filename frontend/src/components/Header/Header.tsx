import { useContext, useEffect, useState } from "react";
import logo from "../../assets/router2.svg";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { dateContext } from "../../context/DateContext";
import { userContext } from "../../context/userContext";

const userLocal: any = localStorage.getItem("user");

export function Header() {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState("");
  // const { setDate } = useContext(dateContext);
  const { user } = useContext(userContext);

  const [activeLink, setActiveLink] = useState<any>(null);
  function logout() {
    setUserAuth("");
    localStorage.clear();
    navigate("/");
  }

  function getUser() {
    if (user) {
      setUserAuth(user);
    }
    console.log(user);
  }

  useEffect(() => {
    getUser();
  }, [userAuth]);
  return (
    <div className="containerHeader">
      <Link to="/">
        <img src={logo} alt="" className="logoImage" />
      </Link>
      {
        !userAuth ? (
          <div>
            <Link to="/login">
              <button className="buttonLogin">Login</button>
            </Link>
          </div>
        ) : (
          // userAuth === "ADM" ?
          //Header Administrativo
          <div className="containerHeader">
            <div className="contentOptionHeader">
              <Link
                to="/product"
                className={activeLink === "/product" ? "active" : ""}
                onClick={() => setActiveLink("/product")}>
                Produtos
              </Link>
              <Link
                to="/client"
                className={activeLink === "/client" ? "active" : ""}
                onClick={() => setActiveLink("/client")}>
                Clientes
              </Link>
              <Link
                to="/order"
                className={activeLink === "/order" ? "active" : ""}
                onClick={() => setActiveLink("/order")}>
                Pedidos
              </Link>
              <Link
                to="/delivery"
                className={activeLink === "/delivery" ? "active" : ""}
                onClick={() => setActiveLink("/delivery")}>
                Rota
              </Link>
              <Link
                to="/reports"
                className={activeLink === "/reports" ? "active" : ""}
                onClick={() => setActiveLink("/reports")}>
                Report
              </Link>
              {/* <Link to="">USUÁRIO</Link> */}
            </div>

            <button className="buttonlogout" onClick={logout}>
              Logout
            </button>
          </div>
        )
        // : (
        //   //Header Entrega
        //   <div className="containerHeader">
        //     <div className="contentOptionHeader">
        //       <input
        //         type="date"
        //         onChange={(e) => handleDateChange(new Date(e.target.value))}
        //       />
        //       <Link to="/delivery">Go</Link>
        //     </div>

        //     <button className="buttonlogout" onClick={logout}>
        //       Logout
        //     </button>
        //   </div>
        // )
      }
    </div>
  );
}
