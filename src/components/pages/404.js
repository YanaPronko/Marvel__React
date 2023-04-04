import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

import './page404.scss';

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p className="not__found">Not found</p>
      <Link className="not__found-link" to="/">
        Back to main page
      </Link>
    </div>
  );
}

export default Page404;