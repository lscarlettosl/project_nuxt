<template>
  <div class="container mx-auto">
    <div class="flex justify-center py-4 text-2xl font-bold">Ноутбуки в аренде</div>
    <table class="w-full table-auto border-collapse border border-slate-500">
      <thead class="justify-center bg-black text-center text-white">
        <th class="border border-black">Номер ноутбука</th>
        <th class="border border-black">Студент</th>
        <th class="border border-black">Время взятия</th>
        <th class="border border-black">Вернуть</th>
      </thead>
      <tbody class="justify-center bg-[#f5f1cb] text-center">
        <tr v-for="item in data">
          <td class="border border-black">{{ item.laptop.number }}</td>
          <td class="border border-black">{{ item.user.name }}</td>
          <td class="border border-black">
            {{ new Date(item.startTime).toLocaleDateString("ru-ru") }}
            {{ new Date(item.startTime).toLocaleTimeString("ru-ru") }}
          </td>
          <td class="border border-black">
            <button
              @click="rent"
              class="rounded-md border border-purple-700 bg-purple-500 px-4 py-1"
            >
              Вернуть
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div>
    <UiDatatable
      @ready="tableRef = $event"
      :data="laptops"
      :options="options"
      :columns="options.columns"
    >
      <template #actions>
        <button @click="rent" class="rounded-md border border-purple-700 bg-purple-500 px-4 py-1">
          Вернуть
        </button>
      </template>
    </UiDatatable>
  </div>
</template>

<script setup lang="ts">
  import type { Config } from "datatables.net";
  import type DataTableRef from "datatables.net";

  const options: Config = {
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.7/i18n/ru.json'
    },
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    autoWidth: true,
    responsive: true,
    buttons: [
      "copy",
      "csv",
      "excel",
      "pdf",
      "print",
      {
        text: "Select all",
        action: function (e, dt, node, config) {
          dt.rows().select();
        },
      },
    ],
    columns: [
      {
        data: "laptop.number",
        title: "Номер ноутбука",
      },
      { data: "user.name", title: "Студент" },
      {
        data: "startTime",
        title: "Время взятия",
        render(data) {
          return new Date(data).toLocaleDateString("ru-ru") + ' ' +new Date(data).toLocaleTimeString("ru-ru");
        },
      },
      {
        data: null,
        title: "Вернуть",
        className: "no-export",
        searchable: false,
        orderable: false,
        name: "actions",
        render: "#actions",
        responsivePriority: 1,
      },
    ],
  };


  const tableRef = shallowRef<InstanceType<typeof DataTableRef<any[]>> | null>(null);

  const { data: laptops } = await useFetch("/api/admin/data");
  const route = useRoute();
  const reqData = ref("");
  async function rent(active) {
    const { data, pending, error, refresh } = await useFetch("/api/rent/return", {
      method: "POST",
      body: {
        id: route.params.id,
      },
    });

    reqData.value = data.value;
  }
</script>
