interface ArticleContentProps {
  html: string;
}

export const ArticleContent = ({ html }: ArticleContentProps) => (
  <div className="article-prose" dangerouslySetInnerHTML={{ __html: html }} />
);

export default ArticleContent;
