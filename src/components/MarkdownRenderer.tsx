import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const parseInlineStyles = (text: string): React.ReactNode[] => {
    // Basic bold parser: **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-black text-[#f9e2af]">{part.slice(2, -2)}</strong>;
      }
      // Basic italic parser: *text*
      const italicParts = part.split(/(\*.*?\*)/g);
      if (italicParts.length > 1) {
        return (
          <React.Fragment key={idx}>
            {italicParts.map((ip, iidx) => {
              if (ip.startsWith('*') && ip.endsWith('*')) {
                return <em key={iidx} className="italic text-[#cdd6f4]">{ip.slice(1, -1)}</em>;
              }
              return ip;
            })}
          </React.Fragment>
        );
      }
      return part;
    });
  };

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="list-disc pl-6 mb-4 text-[#cdd6f4] space-y-2 text-left text-[11px] md:text-xs">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Headers
    if (trimmedLine.startsWith('### ')) {
      flushList(index);
      renderedElements.push(
        <h3 key={index} className="text-xs md:text-sm font-black text-[#f5c2e4] mt-6 mb-3 text-left border-b-2 border-[#313244] pb-1 uppercase tracking-wider">
          {parseInlineStyles(trimmedLine.slice(4))}
        </h3>
      );
    } else if (trimmedLine.startsWith('#### ')) {
      flushList(index);
      renderedElements.push(
        <h4 key={index} className="text-[11px] md:text-xs font-bold text-[#cba6f7] mt-4 mb-2 text-left uppercase tracking-wide">
          {parseInlineStyles(trimmedLine.slice(5))}
        </h4>
      );
    } else if (trimmedLine.startsWith('## ')) {
      flushList(index);
      renderedElements.push(
        <h2 key={index} className="text-sm md:text-base font-black text-[#f9e2af] mt-8 mb-4 text-left uppercase tracking-widest">
          {parseInlineStyles(trimmedLine.slice(3))}
        </h2>
      );
    }
    // Bullet lists
    else if (trimmedLine.startsWith('- ')) {
      listItems.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {parseInlineStyles(trimmedLine.slice(2))}
        </li>
      );
    }
    // Empty line
    else if (trimmedLine === '') {
      flushList(index);
    }
    // Paragraph
    else {
      flushList(index);
      renderedElements.push(
        <p key={index} className="text-[#cdd6f4] leading-relaxed mb-4 text-left text-[11px] md:text-xs">
          {parseInlineStyles(trimmedLine)}
        </p>
      );
    }
  });

  // Flush any remaining list items
  flushList(lines.length);

  return <div className="prose prose-invert max-w-none">{renderedElements}</div>;
};
