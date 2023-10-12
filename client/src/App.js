import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import LandingPage from "./pages/LandingPage";
import HomePage from './pages/HomePage'
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import MyPetsPage from './pages/MyPetsPage';
import AddPetPage from './pages/AddPetPage'
import PetPage from './pages/PetPage';
import DashboardPage from './pages/DashboardPage';
import PetContextProvider from './context/PetContext';
import AuthContextProvider from './context/AuthContext';
import SearchPage from './pages/SearchPage';
import EditPet from './pages/EditPet';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthContextProvider>
      <PetContextProvider>
        <div className="App">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/pet/:id' element={<PetPage />} />

            <Route path='/profilesettings'
              element={<PrivateRoute>
                <ProfileSettingsPage />
              </PrivateRoute>} />

            <Route path='/mypets'
              element={<PrivateRoute>
                <MyPetsPage />
              </PrivateRoute>} />

            <Route path='/addpet'
              element={
                <PrivateRoute onlyAdmin>
                  <AddPetPage />
                </PrivateRoute>
              } />

            <Route path='/editpet/:id'
              element={
                <PrivateRoute onlyAdmin>
                  <EditPet />
                </PrivateRoute>
              } />

            <Route path='/dashboard'
              element={
                <PrivateRoute onlyAdmin>
                  <DashboardPage />
                </PrivateRoute>
              } />

          </Routes>
        </div>
      </PetContextProvider>
    </AuthContextProvider>
  );
}

export default App;
