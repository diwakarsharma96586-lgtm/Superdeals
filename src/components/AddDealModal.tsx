import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, PlusCircle, Tag, Layers, Check } from 'lucide-react';

export const AddDealModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addNewDeal } = useApp();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Smartphones');
  const [mrp, setMrp] = useState<number>(50000);
  const [dealPrice, setDealPrice] = useState<number>(44990);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/src/assets/images/deals_smartphone_flagship_1790689474273.jpg');
  const [saveAsDraft, setSaveAsDraft] = useState(true);

  const CATEGORY_IMAGES: Record<string, string> = {
    'Smartphones': '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg',
    'Laptops': '/src/assets/images/deals_premium_laptop_1790689523020.jpg',
    'Smartwatches': '/src/assets/images/deals_smartwatch_rugged_1790694792732.jpg',
    'Smart TVs': '/src/assets/images/deals_smart_tv_display_1790689504174.jpg',
    'Audio': '/src/assets/images/deals_audio_headphones_1790697009858.jpg',
    'Gaming': '/src/assets/images/deals_gaming_console_1790689489683.jpg',
  };

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    if (CATEGORY_IMAGES[newCat]) {
      setImage(CATEGORY_IMAGES[newCat]);
    }
  };

  const [amazonCost, setAmazonCost] = useState<number>(41990);
  const [flipkartCost, setFlipkartCost] = useState<number>(42490);
  const [wholesalerCost, setWholesalerCost] = useState<number>(39900);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dealPrice) return;

    const baseEmi = Math.round(dealPrice / 6);

    addNewDeal({
      title,
      brand: brand || 'Brand',
      category,
      mrp: Number(mrp),
      dealPrice: Number(dealPrice),
      description: description || 'High demand product with genuine warranty and fast dispatch.',
      image: image || CATEGORY_IMAGES[category] || '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg',
      specs: ['100% Genuine Authorized Stock', '1 Year Brand Warranty', 'Pan-India Fast Dispatch'],
      inStock: true,
      highlightBadge: 'Manual Listing',
      sourceFeed: 'Manual Entry',
      emiPlans: [
        { months: 3, perMonth: Math.round(dealPrice / 3), interestRate: 0, provider: 'No-Cost EMI HDFC', isNoCost: true },
        { months: 6, perMonth: baseEmi, interestRate: 0, provider: 'Bajaj Finserv Zero Down', isNoCost: true },
        { months: 12, perMonth: Math.round((dealPrice * 1.12) / 12), interestRate: 12, provider: 'SBI Card EMI' },
      ],
      vendorSources: [
        { name: 'Wholesaler', price: Number(wholesalerCost), inStock: true, deliveryDays: 2, codAvailable: true, productUrl: '#' },
        { name: 'Amazon', price: Number(amazonCost), inStock: true, deliveryDays: 1, codAvailable: true, productUrl: '#' },
        { name: 'Flipkart', price: Number(flipkartCost), inStock: true, deliveryDays: 2, codAvailable: true, productUrl: '#' },
      ],
    }, saveAsDraft);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-bold">List New Deal</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Apple iPhone 15 Pro Max (256GB, Natural Titanium)"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Apple / Sony / ASUS"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
              >
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Smartwatches">Smartwatches</option>
                <option value="Smart TVs">Smart TVs</option>
                <option value="Audio">Audio</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Market MRP (₹)</label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Our Deal Price (₹)</label>
              <input
                type="number"
                value={dealPrice}
                onChange={(e) => setDealPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>
          </div>

          {/* Sourcing vendor baseline costs */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 text-[11px]">
              Admin Sourcing Cost Benchmark
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Wholesaler Cost</label>
                <input
                  type="number"
                  value={wholesalerCost}
                  onChange={(e) => setWholesalerCost(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Amazon Cost</label>
                <input
                  type="number"
                  value={amazonCost}
                  onChange={(e) => setAmazonCost(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Flipkart Cost</label>
                <input
                  type="number"
                  value={flipkartCost}
                  onChange={(e) => setFlipkartCost(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded bg-white text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Workflow Destination Choice */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
            <div className="text-[11px] font-bold text-indigo-950">
              Workflow Destination
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  checked={saveAsDraft}
                  onChange={() => setSaveAsDraft(true)}
                  className="text-indigo-600"
                />
                <span className="font-semibold text-slate-800">Save to Draft Deals (Review Margins First)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  checked={!saveAsDraft}
                  onChange={() => setSaveAsDraft(false)}
                  className="text-indigo-600"
                />
                <span className="text-slate-600">Publish Immediately</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm"
            >
              {saveAsDraft ? 'Add to Draft Deals Queue' : 'Publish Directly to Storefront'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
