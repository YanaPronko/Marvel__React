import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
// import { MainPage, ComicsPage, SingleComicPage } from '../pages';

const Page404 = lazy(() => import("../pages/404")); //-для lazy подгрузки надо, чтобы компонент экспортировался
// по умолчанию и динамические импорты должны быть после статических
// и еще нужно всю структуру приложения (или главную часть) оборачивать в Suspense
// - для обработки ошибок
// У Suspense есть обязательный атрибут fallback - компонент/элемент -запасной, будет
// отражаться пока грузится ленивый элемент


const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="comics" element={<ComicsPage />} />
              <Route path="/comics/:comicID" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
              {/* Если нужны составные пути(вложенные), то тогда внутрь еще один Route
            или использовать useRoute - спец хук */}
            </Routes>
          </Suspense>
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
