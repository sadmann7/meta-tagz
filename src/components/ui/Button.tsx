import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { forwardRef } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
  loadingVariant?: "spinner" | "dots";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      isLoading = false,
      loadingVariant = "spinner",
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={`flex w-full active:scale-[0.99] items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 ${className} ${
          variant === "primary"
            ? "bg-violet-600 text-white hover:bg-violet-700"
            : variant === "secondary"
            ? "bg-slate-50 text-slate-900 hover:bg-slate-200"
            : "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100"
        }`}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          loadingVariant === "spinner" ? (
            <Loader2 className="mr-2 aspect-square w-4 animate-spin" />
          ) : (
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"></div>
            </div>
          )
        ) : null}
        {isLoading
          ? loadingVariant === "spinner"
            ? "Loading..."
            : null
          : props.children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
