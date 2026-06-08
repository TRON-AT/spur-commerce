export function Hero() {
  return (
    <section className="relative bg-background py-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-5xl px-8 flex items-center justify-center text-center space-y-8">
        <div className="space-y-8">
          <div className="inline-block">
            <span className="text-sm font-medium tracking-widest text-accent uppercase">Premium Collection</span>
          </div>
          
          <h1 className="text-7xl lg:text-8xl font-bold text-balance leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Clothing
            </span>
            <br />
            <span className="text-foreground">Redefined</span>
          </h1>
          
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Discover timeless pieces crafted with precision and care. Each garment tells a story of quality and style.
          </p>
          
          <button className="inline-flex px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  )
}
