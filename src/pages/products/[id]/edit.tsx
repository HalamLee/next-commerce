import CustomEditor from '@/components/Editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1016/1000/600/',
    thumbnail: 'https://picsum.photos/id/1016/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1011/1000/600/',
    thumbnail: 'https://picsum.photos/id/1011/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1012/1000/600/',
    thumbnail: 'https://picsum.photos/id/1012/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1013/1000/600/',
    thumbnail: 'https://picsum.photos/id/1013/250/150/',
  },
];

export default function Products() {
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const { id: productId } = router.query;
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  useEffect(() => {
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            );
          } else {
            setEditorState(EditorState.createEmpty());
          }
        });
    }
  }, [productId]);

  const handleSave = () => {
    if (editorState) {
      fetch('/api/update-product', {
        method: 'POST',
        body: JSON.stringify({
          id: productId,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('Success');
        });
    }
  };

  return (
    <>
      <Carousel
        animation="zoom"
        autoplay
        wrapAround
        withoutControls
        slideIndex={index}
      >
        {images.map((item) => (
          <div
            key={item.original}
            style={{ position: 'relative', width: '100vw', height: '600px' }}
          >
            <Image
              src={item.original}
              alt="image"
              sizes="100vw"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100vw',
          marginTop: '40px',
        }}
      >
        {images.map((item, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              width: '100px',
              height: '50px',
              cursor: 'pointer',
            }}
            onClick={() => setIndex(idx)}
          >
            <Image
              src={item.original}
              alt="image"
              sizes="100%"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  );
}
