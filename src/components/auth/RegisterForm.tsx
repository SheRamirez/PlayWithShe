import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FormError } from '@/components/ui/FormError';
import { useAuthStore } from '@/store/auth';
import { validateForm, ValidationError } from '@/lib/validation';
import { createUser } from '@/lib/db';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validation = validateForm(formData);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    const user = createUser(formData.username, formData.email, formData.password);
    if (user) {
      login({
        id: user.id.toString(),
        username: user.username,
        email: user.email,
      });
      navigate('/games');
    } else {
      setErrors([
        {
          path: 'form',
          message: 'Username or email already exists',
        },
      ]);
    }
  };

  const getError = (field: string) => 
    errors.find((error) => error.path === field)?.message;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <Input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        {getError('username') && <FormError message={getError('username')!} />}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        {getError('email') && <FormError message={getError('email')!} />}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        {getError('password') && <FormError message={getError('password')!} />}
      </div>
      {getError('form') && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{getError('form')}</p>
        </div>
      )}
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
}