import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import WelcomePage from './pages/WelcomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import ProSelectionPage from './pages/ProSelectionPage'
import YearSelectionPage from './pages/YearSelectionPage'
import CourseSelectionPage from './pages/CourseSelectionPage'
import GameSimulationPage from './pages/GameSimulationPage'
import CoursesPage from './pages/CoursesPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/select-pro" element={<ProSelectionPage />} />
        <Route path="/select-year" element={<YearSelectionPage />} />
        <Route path="/select-course" element={<CourseSelectionPage />} />
        <Route path="/game" element={<GameSimulationPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App