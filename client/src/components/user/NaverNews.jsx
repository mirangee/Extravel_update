import { useEffect, useState } from 'react';
import { API_BASE_URL } from './../../config/host-config';

function NaverNews() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch({ API_BASE_URL } + '/api/v1/news')
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
    <div
      className='scrollable-div'
      style={{
        width: '680px',
        height: '362px',
        overflow: 'auto',
        border: '1px solid #14505C',
        padding: '15px',
        borderRadius: '10px',
        marginLeft: '10px',
        scrollbarWidth:
          'thin' /* Firefox에서 스크롤바 너비 설정 */,
        scrollbarColor:
          '#14505C #f1f1f1' /* Firefox 64+에서 스크롤바 색상 설정 */,
        WebkitOverflowScrolling:
          'touch' /* iOS에서 부드러운 스크롤을 위한 설정 */,
      }}
    >
      <h2
        style={{
          textAlign: 'left',
          fontWeight: 'bold',
          padding: '20px 40px',
          color: '#14505C',
        }}
      >
        News🧾
      </h2>
      <ul
        style={{
          listStyleType: 'none',
          fontSize: '16px',
        }}
      >
        {article.map((item, index) => (
          <li
            style={{
              listStyleType: 'none',
              fontSize: '16px',
              padding: '5px',
            }}
            key={index}
          >
            <a
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </h3>
            </a>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NaverNews;
