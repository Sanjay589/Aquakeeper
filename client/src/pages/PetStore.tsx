import React, { useState } from 'react';
import { mockStoreItems } from '../utils/mockData';
import { Store, Plus, Filter, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';

export const PetStore: React.FC = () => {
  const { showToast } = useToast();
  const [storeItems, setStoreItems] = useState(mockStoreItems);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'animals' | 'products' | 'inventory'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'animals' | 'products' | 'inventory'>('products');
  const [quantity, setQuantity] = useState('10');
  const [price, setPrice] = useState('14.99');
  const [sku, setSku] = useState('');

  const handleCreateStoreItem = () => {
    if (!name.trim() || !sku.trim()) {
      showToast('Name and SKU are required.', 'error');
      return;
    }
    const qty = parseInt(quantity) || 0;
    const itemPrice = parseFloat(price) || 0;
    const stockStatus = qty === 0 ? 'out-of-stock' : qty <= 5 ? 'low-stock' : 'in-stock';

    const newItem = {
      id: `st-${Date.now()}`,
      name,
      category,
      stockStatus,
      quantity: qty,
      price: itemPrice,
      sku,
      supplier: 'Default Supplier'
    };

    setStoreItems([newItem, ...storeItems]);
    showToast(`Inventory item "${name}" cataloged!`, 'success');
    setName('');
    setSku('');
    setIsModalOpen(false);
  };

  const handleRestock = (id: string, name: string) => {
    setStoreItems(prev => prev.map(item => {
      if (item.id === id) {
        showToast(`Restocked 20 units of "${name}"!`, 'success');
        return {
          ...item,
          quantity: item.quantity + 20,
          stockStatus: 'in-stock'
        };
      }
      return item;
    }));
  };

  const filteredItems = storeItems.filter(item => {
    if (categoryFilter === 'all') return true;
    return item.category === categoryFilter;
  });

  return (
    <div className="space-y-6 select-none animate-slide-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Store size={20} className="text-sky-400" />
            Pet Store Inventory Management
          </h1>
          <p className="text-xs text-slate-400">Track and manage live animal stocks, products, and equipment levels.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 rounded-xl text-xs font-bold text-white transition-colors"
        >
          <Plus size={14} /> Catalog New Item
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {(['all', 'animals', 'products', 'inventory'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-colors ${
              categoryFilter === cat
                ? 'bg-sky-950 border-sky-500/30 text-sky-450'
                : 'bg-slate-900/40 border-slate-800 text-slate-450 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className="border border-slate-800 bg-slate-900/30 rounded-2xl p-5 flex flex-col justify-between gap-5"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-200 text-xs">{item.name}</h3>
                  <span className="text-[9px] text-slate-500 uppercase font-mono">{item.sku}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${
                  item.stockStatus === 'in-stock'
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                    : item.stockStatus === 'low-stock'
                    ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-950/40 text-rose-400 border border-rose-500/20'
                }`}>
                  {item.stockStatus.replace('-', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-slate-350">
                <div className="p-2 bg-slate-950/40 border border-slate-800/60 rounded-lg">
                  <span className="block text-[8px] text-slate-500 uppercase font-bold">In Stock</span>
                  <span className="font-semibold">{item.quantity} units</span>
                </div>
                <div className="p-2 bg-slate-950/40 border border-slate-800/60 rounded-lg">
                  <span className="block text-[8px] text-slate-500 uppercase font-bold">MSRP Price</span>
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleRestock(item.id, item.name)}
                className="flex-1 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-[10px] font-bold text-sky-400 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Package size={12} /> Restock (+20)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Catalog Retail Stock"
        confirmText="Register Item"
        onConfirm={handleCreateStoreItem}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="store-name" className="text-xs font-semibold text-slate-300">Product/Species Name</label>
            <input 
              id="store-name"
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
              placeholder="e.g. Coral Dip Solution"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="store-cat" className="text-xs font-semibold text-slate-300">Category</label>
              <select 
                id="store-cat"
                value={category} 
                onChange={e => setCategory(e.target.value as any)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
              >
                <option value="animals">Live Livestock (Animals)</option>
                <option value="products">Retail Products (Shelves)</option>
                <option value="inventory">Store Hardware (Inventory)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="store-sku" className="text-xs font-semibold text-slate-300">SKU Code</label>
              <input 
                id="store-sku"
                type="text" 
                value={sku} 
                onChange={e => setSku(e.target.value)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
                placeholder="PRO-COR-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="store-qty" className="text-xs font-semibold text-slate-300">Initial Quantity</label>
              <input 
                id="store-qty"
                type="number" 
                value={quantity} 
                onChange={e => setQuantity(e.target.value)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="store-price" className="text-xs font-semibold text-slate-300">Retail Price ($)</label>
              <input 
                id="store-price"
                type="number" 
                step="0.01"
                value={price} 
                onChange={e => setPrice(e.target.value)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
                required
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default PetStore;
