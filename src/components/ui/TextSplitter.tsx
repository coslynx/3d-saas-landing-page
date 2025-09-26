import React, { useMemo } from 'react';

export interface TextSplitterProps {
  text: string;
  splitBy?: 'character' | 'word';
  className?: string;
  animationDelay?: number;
}

/**
 * A component that splits text into individual characters or words,
 * wrapping each with a span element for styling and animation.
 *
 * @component
 * @example
 * <TextSplitter
 *   text="Hello World"
 *   splitBy="word"
 *   className="text-blue-500"
 *   animationDelay={50}
 * />
 */
const TextSplitter: React.FC<TextSplitterProps> = React.memo(({
  text,
  splitBy = 'character',
  className = '',
  animationDelay = 0,
}) => {
  const splittedText = useMemo(() => {
    if (!text) {
      console.error('TextSplitter: Text prop is required.');
      return [];
    }

    let items: string[] = [];

    if (splitBy === 'character') {
      items = text.split('');
    } else if (splitBy === 'word') {
      items = text.split(' ');
    } else {
      console.error('TextSplitter: Invalid splitBy prop. Must be "character" or "word".');
      return [];
    }

    return items;
  }, [text, splitBy]);

  return (
    <>
      {splittedText.map((item, index) => (
        <span
          key={index}
          className={className}
          style={{
            display: 'inline-block',
            transitionDelay: animationDelay ? `${animationDelay * index}ms` : undefined,
          }}
          aria-hidden="true"
        >
          {item}
        </span>
      ))}
    </>
  );
});

TextSplitter.displayName = 'TextSplitter';
export default TextSplitter;