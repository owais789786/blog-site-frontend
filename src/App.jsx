import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogFeedPage from './pages/BlogFeedPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <Router>
      <div className="auth-shell min-h-screen">
        <Routes>
          <Route path="/" element={<BlogFeedPage />} />
          <Route path="/blogs" element={<BlogFeedPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/create-post" element={
            <ProtectedRoute>
              <CreateBlogPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
