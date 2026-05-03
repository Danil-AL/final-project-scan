import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email("Неверный формат email"),
  password: z.string().min(6, "Пароль минимум 6 символов"),
  firstName: z.string().min(1, "Введите имя"),
  lastName: z.string().min(1, "Введите фамилию"),
  clientId: z.string().min(1, "Client ID обязателен"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/auth/sign_up', data);
      toast.success('Регистрация прошла успешно!');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || 'Ошибка регистрации');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Регистрация сотрудника</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1">Email *</label>
            <input {...register("email")} type="email" className="w-full p-4 border rounded-2xl" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Пароль *</label>
            <input {...register("password")} type="password" className="w-full p-4 border rounded-2xl" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Имя</label>
              <input {...register("firstName")} className="w-full p-4 border rounded-2xl" />
            </div>
            <div>
              <label className="block mb-1">Фамилия</label>
              <input {...register("lastName")} className="w-full p-4 border rounded-2xl" />
            </div>
          </div>

          <div>
            <label className="block mb-1">Client ID *</label>
            <input {...register("clientId")} className="w-full p-4 border rounded-2xl" />
            {errors.clientId && <p className="text-red-500 text-sm">{errors.clientId.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="text-center mt-6">
          Уже есть аккаунт? <Link to="/login" className="text-orange-500 hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
}