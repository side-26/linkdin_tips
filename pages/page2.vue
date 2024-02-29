<script setup lang="ts">
interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}
// @ts-ignore
const { data: todos, pending } = await useAppAsyncData(
  'random-todos',
  () =>
    $fetch<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      method: 'get'
    }),
  { server: false, lazy: true }
)
</script>
<template lang="html">
  <div>
    <nuxt-link to="/"> home page</nuxt-link>
  </div>
  <div>
    <h2>some todos</h2>
    <div v-if="pending">pendig...</div>
    <div
      v-for="{ completed, id, title } in todos"
      :key="id"
      v-if="!pending && todos"
      class="todo"
    >
      <div class="todo_title">
        {{ title }}
      </div>
      <div>completed : {{ completed }}</div>
    </div>
  </div>
</template>
<style lang="css">
.todo {
  border-bottom: solid #111;
}
.todo div:first-child{
    color:red
}
.todo div:nth-child(2){
    color:coral
}
.todo_title{
    padding: 10px 0;
}
</style>
