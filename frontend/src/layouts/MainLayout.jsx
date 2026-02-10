import { useLocation } from 'react-router-dom';
import ButtomNav from '../components/ButtomNav'; 

export const MainLayout = ({ children }) => {
  const location = useLocation();


  const rutasConNav = ['/', '/history', '/accounts', '/settings'];
  

  const mostrarNav = rutasConNav.includes(location.pathname);

  return (
   
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      
      
      <main className="flex-1 pb-20"> 
        {children}
      </main>

     
      {mostrarNav && <ButtomNav />}
    </div>
  );
};
export default MainLayout;