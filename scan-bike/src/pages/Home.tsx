import { Link } from 'react-router-dom';
import { Shield, Bike, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center py-20">
        <div className="flex justify-center mb-6">
          <Bike size={80} className="text-orange-500" />
        </div>
        
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Защитим ваши велосипеды вместе
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Сервис учёта и отслеживания краж велосипедов компании СКАН
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/report"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-medium transition-all"
          >
            Сообщить о краже
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-4 rounded-2xl text-lg font-medium transition-all"
          >
            Войти как сотрудник
          </Link>
        </div>

      
       
      </div>

      {/* Карточки преимуществ */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <Shield className="text-orange-500 mb-4" size={48} />
          <h3 className="text-2xl font-semibold mb-3">Быстрый учёт</h3>
          <p className="text-gray-600 dark:text-gray-400">Моментальная регистрация случаев краж</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <Bike className="text-orange-500 mb-4" size={48} />
          <h3 className="text-2xl font-semibold mb-3">Контроль имущества</h3>
          <p className="text-gray-600 dark:text-gray-400">Полная история каждого велосипеда</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <Users className="text-orange-500 mb-4" size={48} />
          <h3 className="text-2xl font-semibold mb-3">Командная работа</h3>
          <p className="text-gray-600 dark:text-gray-400">Распределение задач между сотрудниками</p>
        </div>
      </div>
    </div>
  );
}