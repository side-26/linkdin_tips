<script setup lang="ts">
interface Data {
  userId: number
  id: number
  title: string
}
// @ts-ignore
const { data: albums, pending } = await useAppAsyncData(
  'random-albums',
  () =>
    $fetch<Data[]>('https://jsonplaceholder.typicode.com/albums', {
      method: 'get'
    }),
  { server: false, lazy: true },
  false
)
</script>
<template lang="html">
  <div>
    <h1>this is lindin_tips home page</h1>
    <nuxt-link to="/page2"> page2 </nuxt-link>
  </div>
  <div>
    <h2>some cached data</h2>
    <div v-if="pending" class="pending">pending ...</div>
    <section v-if="!pending && albums">
      <div v-for="{ id, title } in albums" :key="id">
        <h3>
          {{ title }}
        </h3>
      </div>
    </section>
  </div>
</template>
<style lang="css">
.pending {
  font-size: 1.5rem;
  color: red;
}
</style>
