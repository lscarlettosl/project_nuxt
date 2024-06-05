<template>
  <div class="flex-1 ml-8">
    <div class="mt-5 pr-[29px]">
      <UiDatatable @ready="prepareTable($event)" :data="laptops" :options="options" :columns="options.columns">
      </UiDatatable>
    </div>
  </div>
</template>


<script setup>
import DataTable from "datatables.net-buttons-dt";

const { data: laptops } = await useFetch("/api/admin/history");

const options = {
  language: {
    url: "https://cdn.datatables.net/plug-ins/2.0.7/i18n/ru.json",
  },
  autoWidth: true,
  responsive: true,

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
        return (
          new Date(data).toLocaleDateString("ru-ru") +
          " " +
          new Date(data).toLocaleTimeString("ru-ru")
        );
      },
    },
    {
      data: "endTime",
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







function prepareTable(e) {
  tableRef.value = e;
  new DataTable.Buttons(tableRef.value, {
    name: "commands",
    buttons: [
      {
        extend: "excel",
        text: "<div class='menubtn'><img src='/images/export.svg' alt=''> Excel</div>",
        titleAttr: "Выгрузить таблицу в Excel",
        class: "bg-red-500",
      },
      {
        extend: "pdf",
        text: "<div class='menubtn'><img src='/images/export.svg' alt=''>PDF</div>",
        titleAttr: "Выгрузить таблицу в PDF",
        class: "bg-red-500",
      },
      {
        extend: "print",
        text: "<div class='menubtn'><img src='/images/print.svg' alt=''>Печать</div>",
        titleAttr: "Распечатать",
        class: "bg-red-500",
      },
    ],
  });
  console.log(tableRef.value.buttons().container());
  tableRef.value.buttons(0, null).containers().prependTo("#tableButtons");
}
</script>
