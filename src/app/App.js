import React from "react";
import Header from "./components/ui/header/header";
import MainContent from "./layouts/mainContent";

const App = () => {
    return (
        <div className="container">
            <Header />
            <MainContent />
        </div>
    );
};

export default App;
