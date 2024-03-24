import { defineStore } from 'pinia';
import axios from '@/lib/axios'

export const useCurrenciesStore = defineStore('currencies', {
  state: () => ({
    availableCurrencies: [],
    selectedCurrencies: [],
    conversionMatrix: {},
  }),
  getters: {

  },
  actions: {
    async fetchAvailableCurrencies() {
      try {
        const response = await axios.get('/api/currencies');
        this.availableCurrencies = Object.entries(response.data).map(([code, name]) => ({
            code,
            name
        }));
      } catch (error) {
        console.error('Failed to fetch available currencies:', error);
      }
    },
    async convertCurrencies() {
      if (this.selectedCurrencies.length === 0) {
        console.error('No currencies selected for conversion');
        return;
      }
      try {
        const response = await axios.get('/api/currencies/convert', {
          params: {
            currencies: this.selectedCurrencies.join(','),
          },
        });
        this.conversionMatrix = response.data.matrix;
      } catch (error) {
        console.error('Failed to convert currencies:', error);
      }
    },
    setSelectedCurrencies(currencies) {
      this.selectedCurrencies = currencies;
    },
  },
});