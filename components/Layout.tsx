import Header from './Header'
import Footer from './Footer'

export default function Layout({children}:{children:React.ReactNode}){
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  )
}
