import bookingAxios from '../lib/booking-axios';
import { API_ENDPOINTS_CONFIG } from '../utils/apiConfig';
import { AddOnDetail } from '../app/bookPackage/types';

interface CreateCartPayload {
  packageId: string;
  planId: string;
  organizationId: string;
  travelDate: string; // ISO date string
}

interface AddAddonsPayload {
    addons: AddOnDetail[];
}

export const bookingService = {
  async getActiveCart() {
    try {
      const res = await bookingAxios.get(API_ENDPOINTS_CONFIG.BOOKING.CREATE_CART);
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async createCart(payload: CreateCartPayload) {
    try {
      const res = await bookingAxios.post(API_ENDPOINTS_CONFIG.BOOKING.CREATE_CART, payload);
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async addAddons(cartId: string, payload: AddAddonsPayload) {
    try {
        const res = await bookingAxios.post(API_ENDPOINTS_CONFIG.BOOKING.ADD_ADDONS(cartId), payload);
        return res.data;
    } catch (error) {
        return null;
    }
  },

  async applyVoucher(cartId: string, voucherCode: string) {
    try {
        const res = await bookingAxios.post(API_ENDPOINTS_CONFIG.BOOKING.APPLY_VOUCHER(cartId), {
            voucherCode
        });
        return res.data;
    } catch (error) {
        return null;
    }
  },

  async removeVoucher(cartId: string) {
    try {
        const res = await bookingAxios.delete(API_ENDPOINTS_CONFIG.BOOKING.APPLY_VOUCHER(cartId));
        return res.data;
    } catch (error) {
        return null;
    }
  }
};
