<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import Combobox from '@/components/Combobox.vue'
import { useCurrenciesStore } from '@/stores/currencies';

const currenciesStore = useCurrenciesStore()
var selectedCurrencies = ref([])

onMounted(() => {
  currenciesStore.fetchAvailableCurrencies();
});

const currencies = computed(() => {
  return currenciesStore.availableCurrencies.map(currency => ({
    code: currency.code,
    name: `${currency.code} - ${currency.name}`
  }))
})

const handleUpdateCurrency = (newValue) => {
    selectedCurrencies.value = newValue; 
}
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Currency Converter
            </h2>
        </template>

        <div class="py-12 min-h-96">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200 h-full flex">
                        <div class="w-1/2 p-4">
                            <Combobox
                            v-model="selectedCurrencies"
                            label="Select Currencies to compare:"
                            :options="currencies"
                            />
                        </div>
                        <div class="w-1/2 p-4">
                            <div v-for="currency in selectedCurrencies" :key="currency.code" class="py-2">
                                {{ currency.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
