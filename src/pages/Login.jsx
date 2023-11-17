import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Antd
import { Card } from 'antd';

// Custom Hooks
import { useUser } from '@/hooks/auth/useUser';

// My Components
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';


export default function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "rgb(8, 51, 68)";
    document.title = "Skuy Hotels | Login";
  });

  if (isAuthenticated) navigate("/dashboard", { replace: true });


  if (!isAuthenticated) return (
    <Card className='w-[30rem] mx-auto mt-[13rem] shadow-xl bg-slate-200'>
      <Logo />
      <LoginForm />
    </Card>
  )
}
