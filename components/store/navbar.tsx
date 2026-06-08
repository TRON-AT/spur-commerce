export function Navbar() {
  return (
    <nav className="border-b border-border/30 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-8 py-5 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          SPUR
        </div>
        <div className="flex gap-12 items-center">
          <a href="#shop" className="text-sm font-medium text-foreground/70 hover:text-foreground hover:text-accent transition-colors duration-300">
            Shop
          </a>
          <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground hover:text-accent transition-colors duration-300">
            About
          </a>
        </div>
      </div>
    </nav>
  )
}
