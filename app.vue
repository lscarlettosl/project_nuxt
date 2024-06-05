<template>
  <div class="flex flex-1">
    <TheAsideMenu v-if="data" />
    <NuxtPage />
  </div>
  <TheFooter v-if="data" />
</template>

<script setup>
const { data } = useAuth();
</script>

<style>
body {
  font-family: 'Montserrat';
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dt-buttons {
  display: flex !important;
  flex-direction: column;
  align-items: flex-start !important;
  row-gap: 24px !important;
  margin-bottom: 24px;
  background-color: #E6E8EA;
}

.dt-buttons button {
  display: block !important;
  border: none;
  color: black !important;
  background: none !important;
  padding: 0 !important;
}

.dt-search label {
  display: none !important;
}

.dt-input {
  width: 700px !important;
  margin-top: 30px;
  margin-bottom: 30px;

}

.dt-layout-cell.dt-start {
  display: none;
}

.menubtn {
  display: flex;
  column-gap: 18px;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.dt-column-title {
  color: black;
}

.dt-paging {
  color: black;
}

.dt-paging.paging_full_numbers {
  text-align: center;
}

.dt-input {
  background-color: #E6E8EA !important;
}

.datatable thead th {
  background-color: #E6E8EA !important;
}

.datatable tbody tr {
  background-color: #E6E8EA !important;
}

.dt-paging.paging_full_numbers {
  margin-top: 20px;
}

.dt-paging-button.current {
  background-color: #921CB0 !important;
  color: white;
}
</style>
