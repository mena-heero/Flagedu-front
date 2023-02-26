<template>
  <div>
    <Header />
    <div class="main-container">
      <Nuxt />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "Default",
})
export default class Default extends Vue {}
</script>

<style scoped lang="scss">
.main-container {
  min-height: 500px;
  width: 100%;
  height: 100%;
  background-color: $bg-secondary;
}
</style>
