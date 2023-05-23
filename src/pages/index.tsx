import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import Button from '@/components/Button';

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
      <input
        ref={inputRef}
        type="text"
        placeholder="name"
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      />
      <button
        css={css`
          background-color: hotpink;
          padding: 16px;
          border-radius: 8px;
        `}
        onClick={handleClick}
      >
        Add
      </button>

      <Button onClick={handleClick}>Add 2</Button>

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
