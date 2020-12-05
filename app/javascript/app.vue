<template>
  <div id="app">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: "Pff!"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
