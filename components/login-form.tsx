'use client';

import {
    Alert,
    AlertDescription,
    AlertTitle
} from '@/components/ui/alert';
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
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import LoadingSpinner from './ui/loading-spinner';

interface ILoginData {
    email: string;
    password: string;
}

interface IValidationErrors {
    email: string[],
    password: string[]
}

interface IError {
    status: number | null,
    message: string
}

const loginDataInitialState: ILoginData = {
    email: '',
    password: ''
}

const validationErrorsInitialState: IValidationErrors = {
    email: [],
    password: []
}

const errorInitialState: IError = {
    status: null,
    message: ""
}

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const router = useRouter();
    const [loginData, setLoginData] = useState<ILoginData>(loginDataInitialState);
    const [validationErrors, setValidationErrors] = useState(validationErrorsInitialState);
    const [error, setError] = useState<IError>(errorInitialState);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(validationErrors);
    }, [validationErrors]);

    const loginHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setError(errorInitialState);
        setValidationErrors(validationErrorsInitialState);
        setIsLoading(true);

        try {
            const response = await auth.login(loginData);

            if (response.data.status) {
                router.push('/discount-types');
            }
        } catch (error) {
            setIsLoading(false);

            if (axios.isAxiosError(error)) {
                if (error.status == 400) {
                    const validationErrors =
                        error.response?.data.errors;
                    setValidationErrors(validationErrors);
                } else if (error.status == 401) {
                    setError(error.response?.data);
                }
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
                                    errors={validationErrors.email}
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
                                    errors={validationErrors.password}
                                />

                                {error && error.status == 0 && (
                                    <Alert variant="destructive">
                                        <Terminal className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            {error.message}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    onClick={loginHandler}
                                >
                                    Login{' '}
                                    {isLoading ? (
                                        <LoadingSpinner></LoadingSpinner>
                                    ) : (
                                        ''
                                    )}
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
                                href="#test"
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
