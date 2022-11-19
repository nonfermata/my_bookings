import React from "react";
import Header from "./components/ui/header/header";
import MainContainer from "./layouts/mainContainer";

const App = () => {
    return (
        <div className="container">
            <Header />
            <MainContainer />
        </div>
    );
};

export default App;
