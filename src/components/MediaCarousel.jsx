import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import fufuImg from "../assets/carousel-media/fufu.jpeg";
import tableImg from "../assets/carousel-media/table.jpeg";
import dessertVid from "../assets/carousel-media/dessert.mp4";
import tableVid from "../assets/carousel-media/table-setup.mp4";

export const MediaCarousel = () => {
  const mediaItems = [
    {
      src: fufuImg,
      type: "image",
      title: "picture of fufu dish",
    },
    {
      src: tableImg,
      type: "image",
      title: "picture of the table with guests",
    },
    {
      src: dessertVid,
      type: "video",
      title: "video of the fufu dish",
    },
    {
      src: tableVid,
      type: "video",
      title: "video of the table setp up",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      Pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={0}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {mediaItems.map((item, index) => (
        <SwiperSlide key={index} className="flex justify-center bg-[#F8F2E9] ">
          {item.type === "video" ? (
            <video
              controls
              autoPlay
              className="h-120 w-full rounded-lg shadow-md "
            >
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={item.src}
              alt={item.title}
              className="rounded-lg shadow-md h-120 w-100"
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
