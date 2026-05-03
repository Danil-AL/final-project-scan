import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

const schema = z.object({
  email: z.string().email("Неверный формат email"),
  password: z.string().min(1, "Введите пароль"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post('/auth/sign_in', data);
      
      dispatch(login(res.data.token));
      toast.success('Успешный вход!');
      navigate('/cases');
    } catch (err: any) {
      toast.error(err.message || 'Неверный email или пароль');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Вход для сотрудников</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2">Email</label>
            <input 
              {...register("email")} 
              type="email" 
              className="w-full p-4 border rounded-2xl" 
              placeholder="test@scan.ru"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-2">Пароль</label>
            <input 
              {...register("password")} 
              type="password" 
              className="w-full p-4 border rounded-2xl" 
              placeholder="123456"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="text-center mt-6">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-orange-500 hover:underline">Зарегистрироваться</Link>
        </p>

        <div className="text-center mt-4 text-sm text-gray-500">
          Тестовый аккаунт:<br />
          <strong>test@scan.ru</strong> / <strong>123456</strong>
        </div>
      </div>
    </div>
  );
}