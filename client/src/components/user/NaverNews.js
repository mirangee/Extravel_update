import React, { useEffect, useState } from 'react';

function NaverNews() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8181/api/v1/news')
      .then((response) => response.json())
      .then((data) => {
        const items = data.items;

        const transformArticle = items.map((item) => ({
          title: item.title.replace(/(<([^>]+)>)/gi, ''),
          description: item.description.replace(
            /(<([^>]+)>)/gi,
            '',
          ),
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
      <style>
        {`
          .scrollable-div {
            width: 680px;
            height: 362px;
            overflow: auto;
            border: 1px solid #fff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 0px 3px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.22);
            margin-left: 10px;
            scrollbar-width: thin; /* Firefox에서 스크롤바 너비 설정 */
            scrollbar-color: #14505C #f1f1f1; /* Firefox 64+에서 스크롤바 색상 설정 */
            -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤을 위한 설정 */
          }

          @media (max-width: 1280px) {
            .scrollable-div {
              width: 600px;
              margin-right: 20px;
              position: relative;
              right: 170px;
            }
          }

          @media (max-width: 768px) {
            .scrollable-div {
              height: auto;
            }
          }
        `}
      </style>
      <div className='scrollable-div'>
        <h2
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#14505C',
          }}
        >
          환율 실시간 뉴스🧾
        </h2>
        <ul
          style={{
            listStyleType: 'none',
            fontSize: '16px',
          }}
        >
          {article.map((item, index) => (
            <li
              key={index}
              style={{
                listStyleType: 'none',
                fontSize: '16px',
              }}
            >
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
    </div>
  );
}

export default NaverNews;
