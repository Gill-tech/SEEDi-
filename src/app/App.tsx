import { RouterProvider } from 'react-router';
import { router } from './routes';
import { UserContextProvider } from './context/UserContext';

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
