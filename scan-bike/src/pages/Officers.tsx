import { useGetOfficersQuery, useDeleteOfficerMutation } from '../features/officers/officersApi';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Trash2, Eye, UserCheck } from 'lucide-react';

export default function Officers() {
  const { data: officers = [], isLoading } = useGetOfficersQuery();
  const [deleteOfficer] = useDeleteOfficerMutation();

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить сотрудника?')) return;
    try {
      await deleteOfficer(id).unwrap();
      toast.success('Сотрудник удалён');
    } catch (err) {
      toast.error('Ошибка при удалении');
    }
  };

  if (isLoading) return <p className="text-center">Загрузка сотрудников...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Ответственные сотрудники</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">Имя</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Статус</th>
              <th className="p-4 text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer: any) => (
              <tr key={officer._id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-4">
                  {officer.firstName} {officer.lastName}
                </td>
                <td className="p-4">{officer.email}</td>
                <td className="p-4">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    officer.approved 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {officer.approved ? 'Одобрен' : 'Не одобрен'}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-4">
                  <Link to={`/officers/${officer._id}`} className="text-blue-500 hover:text-blue-600">
                    <Eye size={20} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(officer._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}