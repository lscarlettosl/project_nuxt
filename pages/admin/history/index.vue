<template>
    <div>
        <UiDatatable @ready="tableRef = $event" :data="laptops" :options="options" :columns="options.columns">
            <template #actions="{ cellData }">
            </template>
        </UiDatatable>
    </div>
</template>

<script setup>


const options = {
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.7/i18n/ru.json'
    },
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    autoWidth: true,
    responsive: true,
    order: [3, 'desc'],
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
            data: "endTime",
            sort: 'desc',
            title: "Время возврата",
            render(data) {
                return new Date(data).toLocaleDateString("ru-ru") + ' ' + new Date(data).toLocaleTimeString("ru-ru");
            },
        },
    ],
};


const tableRef = shallowRef(null);

const { data: laptops } = await useFetch("/api/admin/history");
console.log(laptops.value);
const route = useRoute();
const reqData = ref();


</script>