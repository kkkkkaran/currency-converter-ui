<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { useCurrenciesStore } from '@/stores/currencies';
import PrimaryButton from '../components/PrimaryButton.vue';

const currenciesStore = useCurrenciesStore();
const selectedCurrency = ref('');
const selectedInterval = ref('');
const selectedRange = ref('');

onMounted(async () => {
  await currenciesStore.fetchAvailableCurrencies();
  await currenciesStore.fetchReportRequests();
});

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const startDate = computed(() => {
    const today = new Date();
    switch(selectedRange.value) {
    case 'annual':
        return new Date(today.setFullYear(today.getFullYear() - 1)).toISOString();
    case 'biannual':
        return new Date(today.setMonth(today.getMonth() - 6)).toISOString();
    case 'monthly':
        return new Date(today.setMonth(today.getMonth() - 1)).toISOString();
    default:
        return today.toISOString().split('T')[0];
    }
});

const endDate = computed(() => {
    return yesterday.toISOString();
});

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(startDate.value)
  await currenciesStore.submitReportRequest(selectedCurrency.value, startDate.value, endDate.value, selectedInterval.value);
  await currenciesStore.fetchReportRequests();
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Currency Converter - Reports
            </h2>
        </template>    
        <div class="bg-white shadow sm:rounded-lg mt-3 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-5 sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Request a Report</h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>You can request a historical conversion report between USD and one more currency</p>
            </div>
            <form class="mt-5 sm:flex sm:items-center" @submit="handleSubmit">
                <div>
                    <label for="currency" class="block text-sm font-medium leading-6 text-gray-900">Currency</label>
                    <select id="currency" v-model="selectedCurrency" name="currency" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option v-for="currency in currenciesStore.availableCurrencies" :key="currency.code" :value="currency.code">{{currency.name}}</option>
                    </select>
                </div>
                <div class="ml-3">
                    <label for="interval" class="block text-sm font-medium leading-6 text-gray-900">Interval</label>
                    <select id="interval" v-model="selectedInterval" name="interval" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Daily">Daily</option>
                    </select>
                </div>
                <div class="ml-3">
                    <label for="range" class="block text-sm font-medium leading-6 text-gray-900">Range</label>
                    <select id="range" v-model="selectedRange" name="range" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="annual">One Year</option>
                        <option value="biannaual">Six Months</option>
                        <option value="month">One Month</option>
                    </select>
                </div>

                <PrimaryButton class="ml-10 mt-8">
                    Submit Request
                </PrimaryButton>
            </form>
            </div>
        </div>

      <div class="bg-white shadow sm:rounded-lg mt-3 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="overflow-hidden sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Historical Conversion Rate Reports</h3>
            <div class="mt-4 flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Start Date
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            End Date
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Currency
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Interval
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Report
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="report in currenciesStore.reportRequests" :key="report.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ report.start_date }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ report.end_date }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ report.currency }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ report.interval }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ report.status }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-800">
                            <a :href="report.file_url" v-if="report.file_url" target="_blank">Download</a>
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
      </div>
    </AuthenticatedLayout>
</template>
