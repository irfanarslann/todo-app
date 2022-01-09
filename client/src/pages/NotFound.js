import { NavLink } from "react-router-dom";
import NotFoundGif from "../assets/img/vacation-1.gif";
const NotFound404 = () => {
  return (
    <>
      <div className="notfound-page">
        <h1>Whooops!</h1>
        <h3>404 Page not found</h3>
        <img src={NotFoundGif} alt="" />
        <p>
          Looks like this page went on vocation :D <br />
          <span>
            Try to go <NavLink to="/"> Home Page</NavLink>
          </span>
        </p>
      </div>
    </>
  );
};

export default NotFound404;
