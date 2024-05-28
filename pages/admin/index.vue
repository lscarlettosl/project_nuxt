<template>
  <div>
    <UiDatatable @ready="tableRef = $event" :data="laptops" :options="options" :columns="options.columns">
      <template #actions="{ cellData }">
        <button @click="openModal(cellData.hash)" class="rounded-md border border-purple-700 bg-purple-500 px-4 py-1">
          Вернуть
        </button>
      </template>
    </UiDatatable>

    <div>
      <div v-if="showModal"
        class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div class="modal-content border-5 border-black bg-white p-4 rounded-lg text-center">
          <img :src="qr" alt="">
          <h3 class="text-center font-bold">Отсканируй QR-код, чтобы вернуть ноутбук</h3>
          <button @click="closeModal" class="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md">Закрыть</button>
        </div>
      </div>
    </div>
  </div>

</template>




<script setup>
import { ref } from 'vue';
const route = useRoute()
const qr = ref('')

import QRCode from 'qrcode'

const generateQR = async text => {
  try {
    const code = await QRCode.toDataURL(text)
    qr.value = code
  } catch (err) {
    console.error(err)
  }
}

const showModal = ref(false);

function openModal(hash) {
  generateQR('https://3g0tqx7d-5000.euw.devtunnels.ms/return/' + hash)
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}


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
