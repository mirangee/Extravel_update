import React, { useEffect, useState } from 'react';

function NaverNews() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8181/api/v1/news')
      .then((response) => response.json())
      .then((data) => {
        const items = data.items;
        const parser = new DOMParser();

        const transformArticle = items.map((item) => {
          const decodedTitle = parser.parseFromString(
            item.title,
            'text/html',
          ).body.textContent;
          const decodedDescription = parser.parseFromString(
            item.description,
            'text/html',
          ).body.textContent;

          return {
            title: decodedTitle.replace(
              /(<([^>]+)>)/gi,
              '',
            ),
            description: decodedDescription.replace(
              /(<([^>]+)>)/gi,
              '',
            ),
            link: item.link,
          };
        });
        setArticle(transformArticle);
      })
      .catch((error) =>
        console.error('Error fetching data : ', error),
      );
  }, []);

  return (
    <div
      className='scrollable-div'
      style={{
        width: '680px',
        height: '362px',
        overflow: 'auto',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '10px',
        marginLeft: '10px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        환율 실시간 뉴스
      </h2>
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
