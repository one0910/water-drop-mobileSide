import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apollo.ts'
import { ConfigProvider } from "antd-mobile";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import zhTW from 'antd-mobile/es/locales/zh-TW'
// import enUS from 'antd-mobile/es/locales/en-US'
import { routes } from './routes/menus';
import App from './App.tsx'
import { ROUTE_COMPONENT } from './routes';
import './theme.css'
import Login from './containers/Login/index.tsx';
import StudentInfo from './components/StudentInfo/index.tsx';
import Register from './containers/Register/index.tsx';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhTW}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StudentInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<App />}>
              {routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key];
                return (
                  <Route
                    path={item.path}
                    key={item.key}
                    element={<Component />}
                  />
                );
              })}
            </Route>
          </Routes>
        </StudentInfo>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>
)

