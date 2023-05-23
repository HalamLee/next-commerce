import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  // const [products, setProducts] = useState<
  //   { id: string; properties: { id: string }[] }[]
  // >([]);

  const [products, setProducts] = useState<
    { id: string; name: string; createdAt: string }[]
  >([]);

  // useEffect(() => {
  //   fetch('/api/get-items')
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items));
  // }, []);

  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current == null || inputRef.current.value === '') {
      alert('name을 넣어주세요');
      return;
    }
    fetch(`/api/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };
  return (
    <>
      <Head>
        <title>Lami's Commerce</title>
      </Head>
      <input ref={inputRef} type="text" placeholder="name" />
      <button onClick={handleClick}>Add</button>
      <div>
        <p>Product List</p>
        {products &&
          products.map((item) => (
            <div key={item.id}>
              {item.name}
              <span>{item.createdAt}</span>
            </div>
          ))}
        {/* {products &&
          products.map((item) => (
            <div key={item.id}>
              {JSON.stringify(item)}
              {item.properties &&
                Object.entries(item.properties).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      fetch(
                        `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`
                      )
                        .then((res) => res.json())
                        .then((data) => alert(JSON.stringify(data.detail)));
                    }}
                  >
                    {key}
                  </button>
                ))}
              <br />
              <br />
            </div>
          ))} */}
      </div>
    </>
  );
}
