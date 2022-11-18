import { FC, useState } from "react";
import styled, { css } from "styled-components";

type ImageType = {
  title: string;
  id: number;
};

type SliderType = {
  images: ImageType[];
};

const SliderWrapper = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  position: relative;
`;

const LeftControl = styled.div`
  position: absolute;
  left: 0;
  width: 40px;
  height: 500px;
  top: 0;
  bottom: 0;
  z-index: 10;

  &:hover {
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.2);
  }
`;

const RightControl = styled.div`
  position: absolute;
  right: 0;
  width: 40px;
  height: 500px;
  top: 0;
  bottom: 0;
  z-index: 10;

  &:hover {
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.2);
  }
`;

const ImageViewport = styled.div`
  width: 400%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  transition: left linear 0.5s;
`;

const Title = styled.div`
  width: max-content;
  padding: 5px 15px;
  background-color: white;
  color: black;
  font-size: 25px;
`;

const Slide = styled.div<{ src: string }>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-width: 100%;
  background-size: cover;
  box-sizing: border-box;
  padding-bottom: 20px;

  ${({ src }) => css`
    background-image: url(${src});
  `}
`;

const images: ImageType[] = [
  {
    title: "Image 1",
    id: 28,
  },
  {
    title: "Image 2",
    id: 29,
  },
  {
    title: "Image 3",
    id: 30,
  },
  {
    title: "Image 4",
    id: 31,
  },
];

const getImgSrc = (id: number) => `https://picsum.photos/id/${id}/1000/500`;

const Slider: FC<SliderType> = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <SliderWrapper>
      <LeftControl
        onClick={() => {
          setActiveSlide((prev) => {
            if (prev > 0) {
              return prev - 1;
            }

            return 0;
          });
        }}
      />
      <ImageViewport
        style={{
          left: `calc(${-activeSlide} * 100%)`,
        }}
      >
        {images.map(({ title, id }) => {
          return (
            <Slide src={getImgSrc(id)} key={id}>
              <Title>{title}</Title>
            </Slide>
          );
        })}
      </ImageViewport>
      <RightControl
        onClick={() => {
          setActiveSlide((prev) => {
            if (prev < images.length - 1) {
              return prev + 1;
            }

            return images.length - 1;
          });
        }}
      />
    </SliderWrapper>
  );
};

function App() {
  return (
    <div className="App">
      <Slider images={images} />
    </div>
  );
}

export default App;
