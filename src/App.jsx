import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from '@/context/UserContext'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import FeedbackHistoryPage from '@/pages/FeedbackHistoryPage'
import {
  CallInsightsPage,
  KnowledgeBasePage,
  PromptsPage,
  BusyControlsPage,
} from '@/pages/StubPage'


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth_token')
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#171717',
              border: '1px solid #e5e5e5',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />

        <Routes>

          <Route path="/login" element={<LoginPage />} />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls"
            element={
              <ProtectedRoute>
                <CallInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/knowledge"
            element={
              <ProtectedRoute>
                <KnowledgeBasePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prompts"
            element={
              <ProtectedRoute>
                <PromptsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/busy-controls"
            element={
              <ProtectedRoute>
                <BusyControlsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback-history"
            element={
              <ProtectedRoute>
                <FeedbackHistoryPage />
              </ProtectedRoute>
            }
          />

          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
