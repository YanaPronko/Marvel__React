import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from '../pages';

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="comics" element={<ComicsPage />} />
            {/* Если нужны составные пути(вложенные), то тогда внутрь еще один Route */}
          </Routes>
        </main>
        {/* Компонент <Outlet/> используется для рендеринга подкомпонента(вложенного) как плейсхолдер
        который при клике на что-то будет замещаться нужным содержимым
        The <Outlet> renders the current route selected.
        никаких доп реквизитов не нужно*/}
      </div>
    </Router>
  );
};

export default App;
