import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateCaseMutation } from '../features/cases/casesApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const schema = z.object({
  licenseNumber: z.string().min(1, "Обязательное поле"),
  ownerFullName: z.string().min(1, "Обязательное поле"),
  type: z.enum(["general", "sport"]),
  color: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  officer: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ReportTheft() {
  const [createCase] = useCreateCaseMutation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createCase(data).unwrap();
      toast.success("Сообщение о краже успешно отправлено!");
    } catch (err) {
      toast.error("Ошибка при отправке");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Сообщить о краже велосипеда</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-900 p-10 rounded-3xl shadow">
        <div>
          <label className="block mb-2 font-medium">Номер лицензии *</label>
          <input {...register("licenseNumber")} className="w-full p-4 border rounded-2xl" placeholder="ABC-123456" />
        </div>

        <div>
          <label className="block mb-2 font-medium">ФИО владельца *</label>
          <input {...register("ownerFullName")} className="w-full p-4 border rounded-2xl" />
        </div>

        <div>
          <label className="block mb-2 font-medium">Тип велосипеда *</label>
          <select {...register("type")} className="w-full p-4 border rounded-2xl">
            <option value="general">Обычный</option>
            <option value="sport">Спортивный</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Цвет</label>
          <input {...register("color")} className="w-full p-4 border rounded-2xl" />
        </div>

        <div>
          <label className="block mb-2 font-medium">Дата кражи</label>
          <input type="date" {...register("date")} className="w-full p-4 border rounded-2xl" />
        </div>

        <div>
          <label className="block mb-2 font-medium">Дополнительная информация</label>
          <textarea {...register("description")} rows={4} className="w-full p-4 border rounded-3xl" />
        </div>

        {isAuthenticated && (
          <div>
            <label className="block mb-2 font-medium">Ответственный сотрудник</label>
            <select {...register("officer")} className="w-full p-4 border rounded-2xl">
              {/* Здесь можно подгрузить список officers через RTK Query */}
              <option value="">Не назначать</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold transition-all"
        >
          Отправить сообщение
        </button>
      </form>
    </div>
  );
}