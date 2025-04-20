'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import auth from '@/lib/api/auth';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import LoadingSpinner from './ui/loading-spinner';

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const router = useRouter();

    interface ILoginData {
        email: string;
        password: string;
    }

    const [loginData, setLoginData] = useState<ILoginData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: [],
        password: []
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(errors);
    }, [errors])

    const loginHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await auth.login(loginData);

            if(response.data.status){
                router.push('/discount-types');
            }
        } catch (error) {
            setIsLoading(false);

            if (axios.isAxiosError(error) && error.status == 400) {
                const errors = error.response?.data.errors;
                setErrors(errors);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    };

    return (
        <div
            className={cn('flex flex-col gap-6', className)}
            {...props}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your
                        account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={loginData.email}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setLoginData({
                                            ...loginData,
                                            email: e.target.value
                                        });
                                    }}
                                    errors={errors.email}
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={loginData.password}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setLoginData({
                                            ...loginData,
                                            password: e.target.value
                                        });
                                    }}
                                    errors={errors.password}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    onClick={loginHandler}
                                >
                                    Login {isLoading ? <LoadingSpinner></LoadingSpinner> : ""}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    Login with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <a
                                href="#"
                                className="underline underline-offset-4"
                            >
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
