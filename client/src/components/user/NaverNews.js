import { useEffect, useState } from 'react';

function NaverNews() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8181/api/v1/news')
      .then((response) => response.json())
      .then((data) => {
        const items = data.items;

        const transformArticle = items.map((item) => ({
          title: item.title,
          description: item.description,
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
      <h2>Naver News Articles</h2>
      <ul>
        {article.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <h3>{item.title}</h3>
            </a>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NaverNews;
