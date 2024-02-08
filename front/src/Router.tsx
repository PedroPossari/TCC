import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import VeiculoList from "./components/Veiculos/VeiculoList/VeiculoList";
import VeiculoShow from "./components/Veiculos/VeiculoShow/VeiculoShow";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/veiculos" element={<VeiculoList/>} />
            <Route path="/veiculos/:id" element={<VeiculoShow/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    );
}

export default Router;