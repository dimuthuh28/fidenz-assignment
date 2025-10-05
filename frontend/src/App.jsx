import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import WeatherList from './components/WeatherList';
import Login from './components/Login';
import { setAuthToken } from './services/api';
import { RefreshCw } from 'lucide-react';

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAuthToken(token);
        } catch (error) {
          console.error('Error getting token:', error);
        }
      }
    };
    
    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <WeatherList /> : <Login />;
}

export default App;