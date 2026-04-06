import './App.css'
import { Toaster } from 'react-hot-toast';
import AppRouters from './routes/AppRouters';

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouters/>
    </div>
  )
}

export default App
