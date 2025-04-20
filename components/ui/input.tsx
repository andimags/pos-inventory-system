import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    errors?: string[] | null; // ✅ Correct type
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', errors, ...props }, ref) => {
        return (
            <div>
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        errors?.length &&
                            'border-red-500 focus-visible:ring-red-500',
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {/* ✅ Correctly render error messages */}
                {errors?.map((error, index) => (
                    <div
                        key={index}
                        className="text-red-500 text-xs mt-1"
                    >
                        {error}
                    </div>
                ))}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
