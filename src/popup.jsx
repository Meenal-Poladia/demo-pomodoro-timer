import {render} from "react-dom";
import "./styles.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import 'bootstrap/dist/css/bootstrap.min.css';

const Popup = () => {
  return(
      <div className="extension-container">
          <Header/>
          <Main/>
      </div>
  )
}

render(<Popup/>, document.getElementById("react-root"))
