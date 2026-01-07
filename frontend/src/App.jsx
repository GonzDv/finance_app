import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NewAccount from './pages/NewAccount';
import NewMovement from './pages/NewMovement';
import NewCategory from './pages/NewCategory';
import History from './pages/History';
import MainLayout from './layouts/MainLayout';
import FinanceProvider from './context/FinanceContext';

function App() {
  return (
    <Router >
      <FinanceProvider>
        <MainLayout>
          <Routes>
          {/* Ruta Pública */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-account" element={<NewAccount />} />
          <Route path="/new-movement" element={<NewMovement />} />
          <Route path="/new-category" element={<NewCategory />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
          

          {/* Ruta Protegida: El Dashboard */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}

          {/* Redirección por defecto: Si entra a "/" va al dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </MainLayout>
      </FinanceProvider>
    </Router>
  );
}

export default App;