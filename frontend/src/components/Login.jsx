import { useAuth0 } from '@auth0/auth0-react';
import { Cloud, LogIn } from 'lucide-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Cloud className="w-20 h-20 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Dashboard</h1>
          <p className="text-gray-600">Sign in to view weather information</p>
        </div>
        
        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-semibold"
        >
          <LogIn className="w-5 h-5" />
          Sign In with Auth0
        </button>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Protected by Auth0</p>
          <p className="mt-1">Multi-factor authentication enabled</p>
        </div>
      </div>
    </div>
  );
};

export default Login;