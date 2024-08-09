import { createContext, useState } from "react";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState(null);

  return <ArticleContext.Provider value={{ articles, loading, error, meta, setArticles }}>{children}</ArticleContext.Provider>;
};
