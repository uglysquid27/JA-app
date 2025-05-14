import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils"

const Label = forwardRef(
    ({
        children,
        className,
        ...props
    }, ref) => {
        return (
            <label
                className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </label>
        )
    }
)
Label.displayName = "Label"

export { Label }