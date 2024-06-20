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
    <div className='box' style={{ background: 'red' }}>
      <h1 style={({ background: 'red' }, { color: 'red' })}>
        뉴스
      </h1>
      <h2
        className='h'
        style={{ background: 'green' }}
      ></h2>
    </div>
  );
}
export default NaverNews;
