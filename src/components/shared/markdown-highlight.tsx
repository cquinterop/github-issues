import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownHighlightProps {
	markdown: string;
}

const MarkdownHighlight = ({ markdown }: MarkdownHighlightProps) => {
	return (
		<ReactMarkdown
			components={{
				code({ className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					return match ? (
						<SyntaxHighlighter
							PreTag="div"
							language={match[1]}
							style={dracula}
							{...props}
						>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code
							className={className}
							{...props}
						>
							{children}
						</code>
					);
				},
			}}
		>
			{markdown}
		</ReactMarkdown>
	);
};

export default MarkdownHighlight;
