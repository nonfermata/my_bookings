import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Main from "./components/main/main";

const App = () => {
    return (
        <div className="container">
            <Header />
            <Main />
        </div>
    );
};

export default App;
