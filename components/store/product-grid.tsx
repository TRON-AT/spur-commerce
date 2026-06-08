const products = [
  {
    id: 1,
    name: 'Cool T-Shirt',
    price: '$25',
    description: 'Classic comfort meets style',
  },
  {
    id: 2,
    name: 'Premium Denim',
    price: '$85',
    description: 'Durable and timeless',
  },
  {
    id: 3,
    name: 'Organic Hoodie',
    price: '$65',
    description: 'Soft, sustainable, perfect',
  },
]

export function ProductGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <span className="text-xs md:text-sm font-medium tracking-widest text-accent uppercase">Curated Selection</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Collection</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
            Hand-picked pieces that combine quality, comfort, and timeless design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl overflow-hidden bg-card border border-border/40 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300"
            >
              {/* Product Image Placeholder with gradient */}
              <div className="h-48 md:h-64 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center border-b border-border/30 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-light text-foreground/20 group-hover:text-accent/30 transition-colors">●</div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 md:p-8 space-y-4">
                <h3 className="font-bold text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm text-foreground/60">{product.description}</p>
                
                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-border/20">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <button className="px-4 md:px-6 py-2 md:py-2.5 bg-accent text-accent-foreground text-xs md:text-sm font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
