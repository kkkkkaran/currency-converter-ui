<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import Combobox from '@/components/Combobox.vue'
import { useCurrenciesStore } from '@/stores/currencies';
import PrimaryButton from '../components/PrimaryButton.vue';

const currenciesStore = useCurrenciesStore()

const combobox = ref(null)

onMounted(() => {
  currenciesStore.fetchAvailableCurrencies();
});

const resetSelections = () => {
    currenciesStore.selectedCurrencies = []
    currenciesStore.conversionMatrix = {}
    combobox.value.selectedOptions = ref([])
}
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Currency Converter
            </h2>
        </template>

        <div class="my-4">
            <div class="mx-auto sm:px-6 lg:px-16">
                <div class="bg-white shadow-sm sm:rounded-lg p-8">
                    <div class="bg-white border-b border-gray-200 sm:rounded-lg min-h-96 pt-4">
                        <div class="flex">
                            <div class="w-1/2 p-4">
                                <Combobox
                                ref="combobox"
                                v-model="currenciesStore.selectedCurrencies"
                                label="Select Currencies to compare: (Max 5)"
                                :options="currenciesStore.availableCurrencies"
                                max=5
                                />
                            </div>
                            <div class="w-1/2 p-4 pl-12">
                                <div class="block text-sm font-medium leading-6 text-gray-900">
                                    Selected Currencies
                                </div>
                                <div v-for="currency in currenciesStore.selectedCurrencies" :key="currency.code" class="py-2">
                                    {{ currency.name }}
                                </div>
                            </div>
                        </div>
                        <PrimaryButton v-if="!currenciesStore.conversionMatrix.matrix" class="mt-4 ml-5" @click="currenciesStore.convertCurrencies">
                            Convert Currencies
                        </PrimaryButton>
                        <div v-if="currenciesStore.conversionMatrix.matrix">
                            <PrimaryButton class="mt-4 ml-5" @click="resetSelections">
                                Reset
                            </PrimaryButton>
                            <div class="px-4 relative shadow-md sm:rounded-lg mt-10">
                                <table class="w-full text-sm text-left text-gray-500">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                        <th scope="col" class="py-3 px-6">Currency</th>
                                        <th v-for="currency in currenciesStore.conversionMatrix.currencies" :key="currency" class="py-3 px-6">{{ currency }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(rates, currency) in currenciesStore.conversionMatrix.matrix" :key="currency" class="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                            {{ currency }}
                                        </th>
                                        <td v-for="rate in rates" :key="rate" class="py-4 px-6">
                                            {{ rate }}
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
