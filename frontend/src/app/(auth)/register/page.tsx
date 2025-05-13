'use client';

import { RegisterForm } from '@/components/auth/register-form';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent } from '@/components/ui/card';

export default function RegisterPage() {
  // Redirect to dashboard if already authenticated
  useAuth({
    redirectIfAuthenticated: true,
    redirectAuthenticatedTo: '/dashboard',
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
