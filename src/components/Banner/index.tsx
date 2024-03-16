import { Swiper, SwiperSlide } from "swiper/react";
import { theme } from "@/themes/default";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export function Banner() {
    return (
        <div style={{ width: '100%', maxWidth: theme.defaultContainer.width, maxHeight: '410px', background: '#ddd', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={{ nextEl: `.el-${'banner'}-next`, prevEl: `.el-${'banner'}-prev` }}
                pagination={true}
            >
                <button className={`slideNavBanner el-${'banner'}-prev `}><FaAngleLeft /></button>
                <button className={`slideNavBanner el-${'banner'}-next`}><FaAngleRight /></button>
                <SwiperSlide><img style={{ borderRadius: '20px', width: '100%', height: 'auto', display: 'block' }} src={'https://terrasp.com/wp-content/uploads/2024/01/15MAR-NANDO-REIS-SITE-1.jpg'} /></SwiperSlide>
                <SwiperSlide><img style={{ borderRadius: '20px', width: '100%', height: 'auto', display: 'block' }} src={'https://terrasp.com/wp-content/uploads/2024/02/SITE-1900X650-1.jpg'} /></SwiperSlide>
                <SwiperSlide><img style={{ borderRadius: '20px', width: '100%', height: 'auto', display: 'block' }} src={'https://terrasp.com/wp-content/uploads/2024/02/22MAR-MENOS-E-MAIS-1-SITE.jpg'} /></SwiperSlide>
            </Swiper>
        </div>
    )
}
