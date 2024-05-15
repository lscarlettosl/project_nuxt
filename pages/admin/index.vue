<template>
  <div>
    <UiDatatable @ready="tableRef = $event" :data="laptops" :options="options" :columns="options.columns">
      <template #actions="{ cellData }">
        <button @click="rent(cellData.id)" class="rounded-md border border-purple-700 bg-purple-500 px-4 py-1">
          Вернуть
        </button>
      </template>
    </UiDatatable>
  </div>
</template>

<script setup>
const options = {
  language: {
    url: 'https://cdn.datatables.net/plug-ins/2.0.7/i18n/ru.json'
  },
  dom: "<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
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
      action: function (dt) {
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
        return new Date(data).toLocaleDateString("ru-ru") + ' ' + new Date(data).toLocaleTimeString("ru-ru");
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


const tableRef = shallowRef(null);

const { data: laptops } = await useFetch("/api/admin/data");
console.log(laptops.value);
const route = useRoute();
const reqData = ref();

async function rent(id) {
  const { data } = await useFetch("/api/rent/return", {
    method: "POST",
    body: {
      status_id: id,
    },

  })


  if (data) {
    const deleteIndex = laptops.value.map((el) => {
      return el.id
    }).indexOf(id)

    laptops.value.splice(deleteIndex, 1)
  }

  reqData.value = data.value;

}
</script>
