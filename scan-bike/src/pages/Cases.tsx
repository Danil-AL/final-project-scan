import { useGetCasesQuery, useDeleteCaseMutation } from '../features/cases/casesApi';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Trash2, Eye } from 'lucide-react';

export default function Cases() {
  const { data: cases = [], isLoading } = useGetCasesQuery();
  const [deleteCase] = useDeleteCaseMutation();

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить сообщение?')) return;
    try {
      await deleteCase(id).unwrap();
      toast.success('Удалено');
    } catch (e) {
      toast.error('Ошибка удаления');
    }
  };

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Сообщения о кражах</h1>
        <Link to="/report" className="bg-orange-500 text-white px-6 py-3 rounded-xl">Новое сообщение</Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">Номер лицензии</th>
              <th className="p-4 text-left">Владелец</th>
              <th className="p-4 text-left">Тип</th>
              <th className="p-4 text-left">Статус</th>
              <th className="p-4 text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c: any) => (
              <tr key={c._id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-4">{c.licenseNumber}</td>
                <td className="p-4">{c.ownerFullName}</td>
                <td className="p-4 capitalize">{c.type}</td>
                <td className="p-4">
                  <span className={`px-4 py-1 rounded-full text-sm ${
                    c.status === 'done' ? 'bg-green-100 text-green-700' :
                    c.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-center flex justify-center gap-3">
                  <Link to={`/cases/${c._id}`} className="text-blue-500 hover:text-blue-600">
                    <Eye size={20} />
                  </Link>
                  <button onClick={() => handleDelete(c._id)} className="text-red-500 hover:text-red-600">
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