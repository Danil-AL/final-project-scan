import { Link, useNavigate } from 'react-router-dom';
import { Bike, LogOut, Users, FileText } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

export const Header = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold">
          <Bike className="text-orange-500" size={32} />
          <span>СКАН</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-orange-500 transition-colors">Главная</Link>
          <Link to="/report" className="hover:text-orange-500 transition-colors">Сообщить о краже</Link>

          {isAuthenticated ? (
            <>
              <Link to="/cases" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <FileText size={20} /> Кражы
              </Link>
              <Link to="/officers" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <Users size={20} /> Сотрудники
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} /> Выйти
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors">
              Войти как сотрудник
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};