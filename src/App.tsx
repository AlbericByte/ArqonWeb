import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Architecture from './components/Architecture'
import Performance from './components/Performance'
import AgentMemory from './components/AgentMemory'
import UseCase from './components/UseCase'
import SDKs from './components/SDKs'
import GetStarted from './components/GetStarted'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Architecture />
      <Performance />
      <AgentMemory />
      <UseCase />
      <SDKs />
      <GetStarted />
      <CTA />
      <Footer />
    </div>
  )
}
