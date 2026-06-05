import Layout from '../components/Layout'
import Hero from '../components/Hero'

export default function Home(){
  return (
    <Layout>
      <Hero />

      <section className="container mt-12">
        <h2 className="font-display text-2xl mb-4">Featured Edition — Chile</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-deep-blue/10 p-6 rounded">
            <div className="h-64 bg-deep-blue/20 rounded mb-4" />
            <h3 className="font-display text-lg">Editorial Note Preview</h3>
            <p className="text-muted-text mt-2">An introduction to the Chile edition, curated by the editorial collective.</p>
            <a href="/journal" className="mt-4 inline-block text-accent-blue">Read the Edition</a>
          </div>

          <div>
            <h3 className="font-display text-lg">Mission</h3>
            <p className="text-muted-text mt-2">Pale Blue Dot centers student scholars and intellectuals outside the United States. We publish in the author's original language alongside English translations, grounded in intellectual sovereignty and cultural responsibility.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
