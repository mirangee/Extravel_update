import { useEffect, useState } from 'react';

function NaverNews() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8181/main/news')
      .then((response) => response.json())
      .then((data) => {
        const items = data.items;
        const transformArticle = items.map((item) => ({
          title: item.title,
          description: item.descriptions,
          link: item.link,
        }));
        setArticle(transformArticle);
      })
      .catch((error) =>
        console.error('Error fetching data : ', error),
      );
  }, []);

  return (
    <div>
      <h1>네이버 뉴스</h1>
      <ul>
        {article.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a
              href={article.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              기사 보기
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NaverNews;
