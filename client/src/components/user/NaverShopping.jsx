import React, { useEffect, useState } from 'react';

const NaverShopping = () => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8181/api/v1/shopping')
      .then((response) => response.json())
      .then((data) => {
        const items = data.items;

        const transformArticle = items.map((item) => ({
          title: item.title.replace(/(<([^>]+)>)/gi, ''),
          link: item.link,
          image: item.image,
          lprice: item.lprice,
        }));
        setArticle(transformArticle);
      })
      .catch((error) =>
        console.error('Error fetching data : ', error),
      );
  }, []);
  return (
    <div
      className='box'
      style={{
        width: '100%',
        height: '100%',

        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '10px',
        marginLeft: '10px',
      }}
    >
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {article.map((item, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '5px',
                  marginRight: '20px',
                }}
              />
              <div>
                <h3 style={{ margin: '0 0 10px 0' }}>
                  {item.title}
                </h3>
                <a
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    color: '#1a0dab',
                    textDecoration: 'none',
                  }}
                >
                  자세히 보기
                </a>
                <p
                  style={{ margin: '5px 0', color: '#555' }}
                >
                  가격: {item.lprice}원
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NaverShopping;
