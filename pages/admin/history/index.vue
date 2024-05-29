<template>
  <div class="">
    <div class="mb-5 flex justify-end">
      <div class="flex items-center gap-4">
        <button @click="exportData('copy')" class="btn btn-primary">
          <i class="fas fa-copy"></i> Копировать
        </button>
        <button @click="exportData('csv')" class="btn btn-primary">
          <i class="fas fa-file-csv"></i> CSV
        </button>
        <button @click="exportData('excel')" class="btn btn-primary">
          <i class="fas fa-file-excel"></i> Excel
        </button>
        <button @click="exportData('pdf')" class="btn btn-primary">
          <i class="fas fa-file-pdf"></i> PDF
        </button>
        <button @click="printData()" class="btn btn-primary">
          <i class="fas fa-print"></i> Печать
        </button>
        <button @click="selectAll()" class="btn btn-primary">
          <i class="fas fa-check-square"></i> Выбрать все
        </button>
      </div>
    </div>
    <UiDatatable
      @ready="tableRef = $event"
      :data="laptops"
      :options="options"
      :columns="options.columns"
    >
      <template #actions="{ cellData }"> </template>
    </UiDatatable>
  </div>
</template>

<script setup>
  const options = {
    language: {
      url: "https://cdn.datatables.net/plug-ins/2.0.7/i18n/ru.json",
    },
    dom: "t",
    autoWidth: true,
    responsive: true,
    order: [3, "desc"],
    columns: [
      {
        data: "laptop.number",
        title: "Номер ноутбука",
      },
      {
        data: "user.name",
        title: "Студент",
      },
      {
        data: "startTime",
        title: "Время взятия",
        render(data) {
          return (
            new Date(data).toLocaleDateString("ru-ru") +
            " " +
            new Date(data).toLocaleTimeString("ru-ru")
          );
        },
      },
      {
        data: "endTime",
        sort: "desc",
        title: "Время возврата",
        render(data) {
          return (
            new Date(data).toLocaleDateString("ru-ru") +
            " " +
            new Date(data).toLocaleTimeString("ru-ru")
          );
        },
      },
    ],
  };

  const tableRef = shallowRef(null);
  const { data: laptops } = await useFetch("/api/admin/history");
  const route = useRoute();
  const reqData = ref();

  const exportData = (type) => {
    const table = tableRef.value;
    table.buttons(type).trigger();
  };

  const printData = () => {
    const table = tableRef.value;
    table.buttons("print").trigger();
  };

  const selectAll = () => {
    const table = tableRef.value;
    table.rows().select();
  };
</script>
