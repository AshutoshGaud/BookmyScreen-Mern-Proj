import React from "react";
import BannerSider from "../components/shared/BannerSlider";
import Recommended from "../components/Recommended";
import LiveEvents from "../components/LiveEvents";

const Home = () => {
    return (
        <div>
            <BannerSider/>
            <Recommended/>
            <LiveEvents/>
        </div>
    )
}

export default Home