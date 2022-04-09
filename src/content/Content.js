import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../components/login-page/LoginPage";
import { QuestionPage } from "../components/question-page/QuestionPage";
import { Scoreboard } from "../components/scoreboard-page/Scoreboard";

export const Content = () => (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/question-page" element={<QuestionPage />} />
        <Route path="/scoreboard-page" element={<Scoreboard />} />
    </Routes>
);