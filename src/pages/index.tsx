import Head from 'next/head';
import { useRef } from 'react';

export default function Home() {
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
    </>
  );
}
