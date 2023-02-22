<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "Index",
  layout: "auth-layout",
})
export default class Index extends Vue {}
</script>

<style></style>
