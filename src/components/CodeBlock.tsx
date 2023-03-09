import { Icons } from "@/components/Icons";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

type CodeBlockProps = {
  codeLast?: string;
  animationDelay?: number;
  animated?: boolean;
  code: string;
  show: boolean;
  maxHeigth?: number;
};

const CodeBlock = ({
  code,
  show,
  animated,
  animationDelay = 150,
  codeLast,
  maxHeigth = 300,
}: CodeBlockProps) => {
  const initialText = codeLast ? code + codeLast : code;
  const [text, setText] = useState(animated ? "" : initialText);
  const [isCoplied, setIsCoplied] = useState(false);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const interval = setInterval(() => {
          setText(initialText.slice(0, i));
          i++;
          if (i > initialText.length) {
            clearInterval(interval);
          }
        }, 30);
      }, animationDelay);
    }
  }, [show, animated, animationDelay, initialText]);

  return (
    <Highlight {...defaultProps} code={text} language="tsx" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={twMerge(
            "h-auto overflow-auto rounded-md py-2.5 pr-8 transition-all duration-300 ease-in-out",
            className
          )}
          style={{
            ...style,
            background: "hsl(219, 30%, 17%)",
            maxHeight: maxHeigth,
          }}
        >
          <button
            aria-label="copy to clipboard"
            className="absolute top-2 right-2 rounded-md bg-slate-600 p-1.5 transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            onClick={async () => {
              await navigator.clipboard.writeText(text);
              setIsCoplied(true);
              setTimeout(() => {
                setIsCoplied(false);
              }, 1000);
              toast.success("Copied to clipboard");
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
