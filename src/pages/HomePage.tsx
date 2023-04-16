import React from 'react';
import ImageSlider from "../components/ui/ImageSlider";
import RecommendationBlock from "../components/RecommendationBlock";

const HomePage = () => {

    return (
        <div>
            <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Добро пожаловать в наш магазин!</h1>
            <ImageSlider/>
            <RecommendationBlock/>
            <h1 className="h3 text-center my-4 mx-36">Наш магазин предлагает изделия народных художественных
                промыслов России: гжель, донской фаянс, павловопосадские платки, вологодское кружево, хохлому, изделия с
                мезенской росписью, лаковую миниатюру и многое другое. В нашем ассортименте посуда, украшения интерьера,
                текстиль, авторская бижутерия, картины самарских художников и самарские сувениры. Подарки, купленные у
                нас, обязательно принесут радость, потому что они хранят тепло рук, создавших их художников.</h1>

        </div>
    );
};

export default HomePage;