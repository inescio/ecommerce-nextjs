const Header = ({ setView }) => {
    const { getTotalItems, setCartOpen } = useCart();
    const { wishlist } = useWishlist();
    const { isAuthenticated, user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => setView('home')}
            >
              ShopPro
            </h1>
  
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
  
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setView('profile')}
                    className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2"
                  >
                    <User size={20} />
                    <span className="hidden lg:block">{user.name}</span>
                  </button>
                  <button
                    onClick={logout}
                    className="text-red-600 hover:bg-red-50 rounded-lg p-2"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setView('login')}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2"
                >
                  <User size={20} />
                  <span className="hidden lg:block">Iniciar Sesión</span>
                </button>
              )}
  
              <button
                onClick={() => setView('wishlist')}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <Heart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
  
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  };