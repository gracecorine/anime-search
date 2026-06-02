import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@components/Navbar'
import Home from '@pages/Home'
import AnimeDetail from '@pages/AnimeDetail'
import Search from '@pages/Search'
import ScrollToTop from '@components/common/ScrollToTop'

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[#fdf6f0] dark:bg-[#0f0a1a]">
                <ScrollToTop />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/anime/:id" element={<AnimeDetail />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}