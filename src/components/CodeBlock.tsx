import { Icons } from "@/components/Icons";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

type CodeBlockProps = {
  code: string;
  maxHeigth?: number;
};

const CodeBlock = ({ code, maxHeigth = 1024 }: CodeBlockProps) => {
  const [isCoplied, setIsCoplied] = useState(false);

  return (
    <Highlight {...defaultProps} code={code} language="tsx" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={twMerge(
            "relative h-auto overflow-auto whitespace-pre-wrap rounded-md px-8 py-7 transition-all duration-300 ease-in-out",
            className
          )}
          style={{
            ...style,
            background: "hsl(219, 30%, 17%)",
            maxHeight: maxHeigth,
          }}
        >
          <button
            aria-label="copy meta tags to clipboard"
            className="absolute top-4 right-4 rounded-md bg-slate-600 p-1.5 transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            onClick={async () => {
              await navigator.clipboard.writeText(code);
              setIsCoplied(true);
              toast.success("Tags copied to clipboard", {
                icon: "✂️",
              });
              setTimeout(() => {
                setIsCoplied(false);
              }, 1000);
            }}
          >
            {isCoplied ? (
              <Icons.check className="h-4 w-4 text-white" />
            ) : (
              <Icons.clipboard className="h-4 w-4 text-white" />
            )}
            <span className="sr-only">Copy to clipboard</span>
          </button>

          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
