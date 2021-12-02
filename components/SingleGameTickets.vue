<template>
  <div>
    <h1 class="m-0" data-aos="fade-down-right">
      <span>Single Game</span> TICKETS
    </h1>
    <button
      type="button"
      class="btn btn-primary"
      data-aos="fade-down-right"
      v-tooltip="{
        content: 'Nuxt is awsome',
      }"
    >
      {{ 'my enemy ' | capitalize }}
    </button>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch('fetch_sgt_data');
  },
}
</script>
