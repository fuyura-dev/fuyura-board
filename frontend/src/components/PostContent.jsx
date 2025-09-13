import DOMPurify from "dompurify";
import he from "he";

function PostContent({ content }) {
  if (!content) return null;

  let decoded = he.decode(content);

  decoded = decoded
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((line) => {
      if (line.startsWith(">") && !line.startsWith(">>>")) {
        return `<span class="greentext">${line}</span>`;
      }
      return line;
    })
    .join("<br>");

  const safeHTML = DOMPurify.sanitize(decoded);

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
}

export default PostContent;
