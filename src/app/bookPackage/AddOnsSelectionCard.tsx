"use client";

import { useState } from 'react';
import { AddOnDetail } from './types';
import { Plus, Minus } from 'lucide-react';

// Mock data for available addons
const AVAILABLE_ADDONS: AddOnDetail[] = [
  { id: 'addon_1', title: 'Airport Pickup', desc: 'Convenient pickup from the airport.', price: 1500, tag: 'Transport', quantity: 1, pricePerUnit: 1500 },
  { id: 'addon_2', title: 'Guided City Tour', desc: 'Explore the city with a local guide.', price: 3000, tag: 'Tour', quantity: 1, pricePerUnit: 3000 },
  { id: 'addon_3', title: 'Adventure Sports Package', desc: 'Experience thrilling adventure sports.', price: 5000, tag: 'Activity', quantity: 1, pricePerUnit: 5000 },
  { id: 'addon_4', title: 'Travel Insurance', desc: 'Comprehensive travel insurance.', price: 2000, tag: 'Insurance', quantity: 1, pricePerUnit: 2000 },
];

interface AddOnsSelectionCardProps {
  onAddonsChange: (addons: AddOnDetail[]) => void;
  currencySymbol: string;
}

export default function AddOnsSelectionCard({ onAddonsChange, currencySymbol }: AddOnsSelectionCardProps) {
  const [selectedAddons, setSelectedAddons] = useState<AddOnDetail[]>([]);

  const handleAddonToggle = (addon: AddOnDetail) => {
    const existingIndex = selectedAddons.findIndex(a => a.id === addon.id);
    
    if (existingIndex >= 0) {
      // Remove addon if already selected
      const newSelected = selectedAddons.filter(a => a.id !== addon.id);
      setSelectedAddons(newSelected);
      onAddonsChange(newSelected);
    } else {
      // Add new addon with default quantity of 1
      const newAddon: AddOnDetail = {
        ...addon,
        quantity: 1,
        pricePerUnit: addon.price,
        price: addon.price // Total price = quantity * pricePerUnit
      };
      const newSelected = [...selectedAddons, newAddon];
      setSelectedAddons(newSelected);
      onAddonsChange(newSelected);
    }
  };

  const handleQuantityChange = (addonId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedAddons = selectedAddons.map(addon => {
      if (addon.id === addonId) {
        const pricePerUnit = addon.pricePerUnit || addon.price;
        return {
          ...addon,
          quantity: newQuantity,
          price: newQuantity * pricePerUnit
        };
      }
      return addon;
    });
    
    setSelectedAddons(updatedAddons);
    onAddonsChange(updatedAddons);
  };

  const isAddonSelected = (addonId: string) => {
    return selectedAddons.some(a => a.id === addonId);
  };

  const getSelectedAddon = (addonId: string) => {
    return selectedAddons.find(a => a.id === addonId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Select Add-ons</h2>
      <div className="space-y-4">
        {AVAILABLE_ADDONS.map((addon) => {
          const isSelected = isAddonSelected(addon.id);
          const selectedAddon = getSelectedAddon(addon.id);
          const quantity = selectedAddon?.quantity || 1;
          
          return (
            <div
              key={addon.id}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{addon.title}</p>
                <p className="text-sm text-gray-500">{addon.desc}</p>
              </div>
              <div className="flex items-center space-x-4">
                {isSelected && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(addon.id, quantity - 1);
                      }}
                      className="w-8 h-8 rounded-full bg-[#276074] text-white flex items-center justify-center hover:bg-[#1d4a56] transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(addon.id, quantity + 1);
                      }}
                      className="w-8 h-8 rounded-full bg-[#276074] text-white flex items-center justify-center hover:bg-[#1d4a56] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <span className="font-bold text-[#276074] min-w-[80px] text-right">
                  {currencySymbol}
                  {(addon.price * quantity).toLocaleString()}
                </span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddonToggle(addon);
                  }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 cursor-pointer ${
                    isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
