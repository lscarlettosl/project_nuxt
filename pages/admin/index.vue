<template>
  <div class="flex-1 ml-8">
    <div class="pr-[29px]">
      <UiDatatable @ready="prepareTable($event)" :data="laptops" :options="options" :columns="options.columns">
        <template #actions="{ cellData }">
          <button @click="openModal(cellData.hash)" class="rounded-md border text-white bg-[#921CB0] px-4 py-1">
            Вернуть
          </button>
        </template>
      </UiDatatable>
    </div>
    <div>
      <div v-if="showModal"
        class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
        <div class="modal-content border-5 rounded-lg border-black bg-white p-4 text-center">
          <div class="flex justify-center">
            <img class="border-4 border-black" :src="qr" alt="" />
          </div>
          <h3 class="text-center font-bold">Отсканируй QR-код, чтобы вернуть ноутбук</h3>
          <button @click="closeModal" class="mt-4 rounded-md bg-[#921CB0] px-4 py-2 text-white">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataTable from "datatables.net-buttons-dt";
import QRCode from "qrcode";
import { ref } from "vue";

const route = useRoute();
const qr = ref("");

const generateQR = async (text) => {
  try {
    const code = await QRCode.toDataURL(text);
    qr.value = code;
  } catch (err) {
    console.error(err);
  }
};

const showModal = ref(false);
const { data: laptops } = await useFetch("/api/admin/data");

function checkStatus(hash) {
  let interval = setInterval(async () => {


    const { data: status } = await useFetch('/api/admin/checkStatus', {
      method: 'POST',
      body: {
        hash: hash
      }
    })

    if (status?.value.active === false) {
      closeModal()
      clearInterval(interval)
      laptops.value = laptops.value.filter((el) => el.hash !== hash) // внимательно(!!!!!)
    }

  }, 2000);
}

function openModal(hash) {
  generateQR("https://3g0tqx7d-5000.euw.devtunnels.ms/return/" + hash);
  showModal.value = true;
  checkStatus(hash)
}

function closeModal() {
  showModal.value = false;
}

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
