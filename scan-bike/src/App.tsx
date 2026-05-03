import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './widgets/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ReportTheft from './pages/ReportTheft'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'
import Officers from './pages/Officers'
import OfficerDetail from './pages/OfficerDetail'
import { ProtectedRoute } from './shared/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/report" element={<ReportTheft />} />

            {/* Защищённые маршруты */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases/:id" element={<CaseDetail />} />
              <Route path="/officers" element={<Officers />} />
              <Route path="/officers/:id" element={<OfficerDetail />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App