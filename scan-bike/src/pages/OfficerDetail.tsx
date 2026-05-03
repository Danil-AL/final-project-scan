import { useParams, useNavigate } from 'react-router-dom';
import { useGetOfficerQuery, useUpdateOfficerMutation, useDeleteOfficerMutation } from '../features/officers/officersApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';

const schema = z.object({
  firstName: z.string().min(1, "Введите имя"),
  lastName: z.string().min(1, "Введите фамилию"),
  email: z.string().email("Неверный email"),
  approved: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function OfficerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: officer, isLoading } = useGetOfficerQuery(id!);
  const [updateOfficer] = useUpdateOfficerMutation();
  const [deleteOfficer] = useDeleteOfficerMutation();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (officer) {
      setValue('firstName', officer.firstName);
      setValue('lastName', officer.lastName);
      setValue('email', officer.email);
      setValue('approved', officer.approved);
    }
  }, [officer, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateOfficer({ id, ...data }).unwrap();
      toast.success('Данные сотрудника обновлены');
    } catch (err) {
      toast.error('Ошибка при сохранении');
    }
  };

  const handleDelete = async () => {
    if (confirm('Удалить сотрудника навсегда?')) {
      try {
        await deleteOfficer(id!).unwrap();
        toast.success('Сотрудник удалён');
        navigate('/officers');
      } catch (err) {
        toast.error('Ошибка удаления');
      }
    }
  };

  if (isLoading) return <p className="text-center text-xl">Загрузка...</p>;
  if (!officer) return <p>Сотрудник не найден</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Сотрудник: {officer.firstName} {officer.lastName}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow space-y-6">
        
        <div>
          <label className="block mb-2 font-medium">Email (нельзя изменить)</label>
          <input 
            value={officer.email} 
            disabled 
            className="w-full p-4 border rounded-2xl bg-gray-100 dark:bg-gray-800" 
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Имя</label>
          <input {...register("firstName")} className="w-full p-4 border rounded-2xl" />
        </div>

        <div>
          <label className="block mb-2 font-medium">Фамилия</label>
          <input {...register("lastName")} className="w-full p-4 border rounded-2xl" />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            {...register("approved")} 
            className="w-5 h-5 accent-orange-500"
          />
          <label className="font-medium">Одобрен (активен)</label>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Сохранить изменения
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Удалить сотрудника
          </button>
        </div>
      </form>
    </div>
  );
}