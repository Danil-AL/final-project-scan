// src/pages/CaseDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCaseQuery, useUpdateCaseMutation, useDeleteCaseMutation } from '../features/cases/casesApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';

const schema = z.object({
  status: z.enum(['new', 'in_progress', 'done']),
  licenseNumber: z.string().min(1),
  type: z.enum(['general', 'sport']),
  ownerFullName: z.string().min(1),
  color: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  officer: z.string().optional(),
  resolution: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: caseData, isLoading } = useGetCaseQuery(id!);
  const [updateCase] = useUpdateCaseMutation();
  const [deleteCase] = useDeleteCaseMutation();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const status = watch('status');

  useEffect(() => {
    if (caseData) {
      Object.keys(caseData).forEach(key => {
        if (key in caseData) setValue(key as keyof FormData, caseData[key]);
      });
    }
  }, [caseData, setValue]);

  const onSubmit = async (data: FormData) => {
    if (data.status === 'done' && !data.resolution) {
      toast.error("При статусе 'Завершен' обязательно заполните поле resolution");
      return;
    }

    try {
      await updateCase({ id, ...data }).unwrap();
      toast.success('Изменения сохранены');
    } catch (err) {
      toast.error('Ошибка сохранения');
    }
  };

  const handleDelete = async () => {
    if (confirm('Удалить это сообщение навсегда?')) {
      await deleteCase(id!).unwrap();
      toast.success('Сообщение удалено');
      navigate('/cases');
    }
  };

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Детали случая #{id}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 p-10 rounded-3xl space-y-6">
        {/* Все поля формы здесь (аналогично ReportTheft, но с возможностью редактирования) */}

        <div>
          <label>Статус</label>
          <select {...register("status")} className="w-full p-4 border rounded-2xl">
            <option value="new">Новый</option>
            <option value="in_progress">В работе</option>
            <option value="done">Завершен</option>
          </select>
        </div>

        {status === 'done' && (
          <div>
            <label>Завершающий комментарий (resolution) *</label>
            <textarea {...register("resolution")} rows={4} className="w-full p-4 border rounded-3xl" required />
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-orange-500 text-white py-4 rounded-2xl text-lg">
            Сохранить изменения
          </button>
          <button type="button" onClick={handleDelete} className="flex-1 bg-red-500 text-white py-4 rounded-2xl text-lg">
            Удалить
          </button>
        </div>
      </form>
    </div>
  );
}