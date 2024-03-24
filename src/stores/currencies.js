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
    async fetchAvailableCurrencies(errors) {
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
    async convertCurrencies(setErrors) {
      if (this.selectedCurrencies.length < 0) {
        alert('Not enough currencies selected for conversion');
        return;
      }
      this.selectedCurrencies.map(currency => console.log(currency.value))
      try {
        const response = await axios.get('/api/currencies/convert', {
          params: {
            currencies: this.selectedCurrencies.map(currency => currency.code),
          },
        });
        this.conversionMatrix = response.data;
      } catch (error) {
        if (error.response.status !== 422) throw error
          setErrors.value = Object.values(
              error.response.data.errors,
          ).flat()
      }
    },
    setSelectedCurrencies(currencies) {
      this.selectedCurrencies = currencies.map(currency => currency.code);
    },
  },
});